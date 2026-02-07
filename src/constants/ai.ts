import { AIProvider } from '../types';

type APIFormat = 'openai' | 'anthropic';

export interface AIProviderConfig {
  name: string;
  baseUrl: string;
  model: string;
  visionModel: string;
  placeholder: string;
  format: APIFormat;
}

export const AI_PROVIDERS: Record<AIProvider, AIProviderConfig> = {
  openai: {
    name: 'OpenAI',
    baseUrl: 'https://api.openai.com/v1',
    model: 'gpt-4o-mini',
    visionModel: 'gpt-4o',
    placeholder: 'sk-...',
    format: 'openai',
  },
  anthropic: {
    name: 'Claude',
    baseUrl: 'https://api.anthropic.com/v1',
    model: 'claude-sonnet-4-5-20250929',
    visionModel: 'claude-sonnet-4-5-20250929',
    placeholder: 'sk-ant-...',
    format: 'anthropic',
  },
  groq: {
    name: 'Groq',
    baseUrl: 'https://api.groq.com/openai/v1',
    model: 'llama-3.3-70b-versatile',
    visionModel: 'llama-3.2-90b-vision-preview',
    placeholder: 'gsk_...',
    format: 'openai',
  },
  deepseek: {
    name: 'DeepSeek',
    baseUrl: 'https://api.deepseek.com/v1',
    model: 'deepseek-chat',
    visionModel: 'deepseek-chat',
    placeholder: 'sk-...',
    format: 'openai',
  },
  google: {
    name: 'Gemini',
    baseUrl: 'https://generativelanguage.googleapis.com/v1beta/openai',
    model: 'gemini-2.0-flash',
    visionModel: 'gemini-2.0-flash',
    placeholder: 'AIza...',
    format: 'openai',
  },
};

export interface AIConfig {
  apiKey: string;
  baseUrl: string;
  model: string;
  visionModel: string;
  format: APIFormat;
}

export function getAIConfig(aiProvider: AIProvider, apiKey: string): AIConfig {
  const provider = AI_PROVIDERS[aiProvider];
  return {
    apiKey,
    baseUrl: provider.format === 'anthropic'
      ? `${provider.baseUrl}/messages`
      : `${provider.baseUrl}/chat/completions`,
    model: provider.model,
    visionModel: provider.visionModel,
    format: provider.format,
  };
}

// --- Unified chat completion ---

type ContentPart =
  | { type: 'text'; text: string }
  | { type: 'image_url'; image_url: { url: string; detail?: string } };

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string | ContentPart[];
}

export async function chatCompletion(
  config: AIConfig,
  model: string,
  messages: ChatMessage[],
  options?: { temperature?: number; maxTokens?: number },
): Promise<string> {
  const { temperature = 0.7, maxTokens = 2000 } = options ?? {};

  if (!config.apiKey) {
    throw new Error('No se ha configurado la API key. Ve a Ajustes para agregarla.');
  }

  let response: Response;

  try {
    if (config.format === 'anthropic') {
      const systemMsg = messages.find(m => m.role === 'system');
      const nonSystem = messages.filter(m => m.role !== 'system');

      const anthropicMessages = nonSystem.map(m => ({
        role: m.role,
        content: typeof m.content === 'string'
          ? m.content
          : m.content.map(part => {
              if (part.type === 'image_url' && part.image_url) {
                const match = part.image_url.url.match(/^data:(.*?);base64,(.*)$/);
                if (match) {
                  return {
                    type: 'image' as const,
                    source: { type: 'base64' as const, media_type: match[1], data: match[2] },
                  };
                }
              }
              return { type: 'text' as const, text: (part as { text?: string }).text || '' };
            }),
      }));

      response = await fetch(config.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': config.apiKey,
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
          model,
          ...(systemMsg
            ? { system: typeof systemMsg.content === 'string' ? systemMsg.content : '' }
            : {}),
          messages: anthropicMessages,
          temperature,
          max_tokens: maxTokens,
        }),
      });
    } else {
      response = await fetch(config.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${config.apiKey}`,
        },
        body: JSON.stringify({
          model,
          messages: messages.map(m => ({ role: m.role, content: m.content })),
          temperature,
          max_tokens: maxTokens,
        }),
      });
    }
  } catch {
    throw new Error('Error de conexion. Verifica tu internet e intenta de nuevo.');
  }

  if (response.status === 401) {
    throw new Error('API key invalida. Verifica tu clave en Ajustes.');
  }
  if (response.status === 429) {
    throw new Error('Demasiadas solicitudes. Espera un momento e intenta de nuevo.');
  }
  if (!response.ok) {
    throw new Error(`Error del servidor (${response.status}). Intenta de nuevo mas tarde.`);
  }

  let data: any;
  try {
    data = await response.json();
  } catch {
    throw new Error('Error al procesar la respuesta del servidor.');
  }

  const content: string | undefined =
    config.format === 'anthropic'
      ? data.content?.[0]?.text
      : data.choices?.[0]?.message?.content;

  if (!content) {
    throw new Error('No se recibio respuesta del modelo.');
  }

  return content;
}
