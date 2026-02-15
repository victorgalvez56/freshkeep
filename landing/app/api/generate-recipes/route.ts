import { NextRequest, NextResponse } from 'next/server';
import { checkLimit } from '../_lib/rateLimit';

interface ItemInput {
  name: string;
  quantity: number;
  unit: string;
  expirationDate: string;
}

const SYSTEM_PROMPT = `Eres un chef nutricionista experto. Tu trabajo es sugerir recetas saludables y practicas usando los ingredientes disponibles del usuario. SIEMPRE responde en espanol. Prioriza usar ingredientes que estan por vencer o vencidos recientemente. Responde UNICAMENTE con un JSON valido, sin texto adicional, con el siguiente formato:
{
  "recipes": [
    {
      "name": "Nombre de la receta",
      "emoji": "emoji representativo",
      "description": "Descripcion breve de la receta",
      "servingSize": "2 porciones",
      "calories": 350,
      "protein": 25,
      "fats": 12,
      "carbs": 30,
      "ingredients": ["200g de pollo", "1 taza de arroz"],
      "instructions": ["Paso 1: ...", "Paso 2: ..."]
    }
  ]
}`;

function daysUntil(dateStr: string): number {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const target = new Date(dateStr + 'T00:00:00');
  return Math.ceil((target.getTime() - now.getTime()) / 86_400_000);
}

export async function POST(request: NextRequest) {
  const deviceId = request.headers.get('x-device-id');
  if (!deviceId) {
    return NextResponse.json({ error: 'Se requiere identificador de dispositivo.' }, { status: 400 });
  }

  const { ok } = checkLimit(deviceId, 'recipes');
  if (!ok) {
    return NextResponse.json(
      { error: 'Has alcanzado el limite diario de recetas (3/dia). Intenta manana.' },
      { status: 429 },
    );
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: 'Servicio no disponible temporalmente.' },
      { status: 503 },
    );
  }

  let body: { items?: ItemInput[]; count?: number };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Body invalido.' }, { status: 400 });
  }

  if (!body.items || !Array.isArray(body.items) || body.items.length === 0) {
    return NextResponse.json({ error: 'Se requiere una lista de items.' }, { status: 400 });
  }

  const count = body.count ?? 3;

  const inventoryList = body.items
    .map((item) => {
      const days = daysUntil(item.expirationDate);
      const urgency = days <= 0 ? '(VENCIDO)' : days <= 2 ? '(por vencer)' : '';
      return `- ${item.name}: ${item.quantity} ${item.unit} ${urgency}`;
    })
    .join('\n');

  const userPrompt = `Tengo estos ingredientes en mi inventario:\n${inventoryList}\n\nSugiere ${count} recetas que pueda preparar con estos ingredientes. Prioriza usar los ingredientes que estan por vencer. Los valores nutricionales deben ser estimaciones razonables por porcion.`;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: userPrompt },
        ],
        temperature: 0.7,
        max_tokens: 2000,
      }),
    });

    if (!response.ok) {
      const status = response.status;
      if (status === 429) {
        return NextResponse.json(
          { error: 'Demasiadas solicitudes al servicio de IA. Intenta en unos segundos.' },
          { status: 429 },
        );
      }
      return NextResponse.json(
        { error: `Error del servicio de IA (${status}).` },
        { status: 502 },
      );
    }

    const data = await response.json();
    const content: string | undefined = data.choices?.[0]?.message?.content;

    if (!content) {
      return NextResponse.json(
        { error: 'No se recibio respuesta del modelo.' },
        { status: 502 },
      );
    }

    let parsed: { recipes: Record<string, unknown>[] };
    try {
      parsed = JSON.parse(content);
    } catch {
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        return NextResponse.json(
          { error: 'No se pudo interpretar la respuesta de la IA.' },
          { status: 422 },
        );
      }
      parsed = JSON.parse(jsonMatch[0]);
    }

    if (!parsed.recipes || !Array.isArray(parsed.recipes)) {
      return NextResponse.json(
        { error: 'La respuesta no contiene recetas validas.' },
        { status: 422 },
      );
    }

    const recipes = parsed.recipes.map((r: Record<string, unknown>) => ({
      name: r.name || 'Receta sin nombre',
      emoji: r.emoji || '',
      description: r.description || '',
      servingSize: r.servingSize || '1 porcion',
      calories: Number(r.calories) || 0,
      protein: Number(r.protein) || 0,
      fats: Number(r.fats) || 0,
      carbs: Number(r.carbs) || 0,
      ingredients: Array.isArray(r.ingredients) ? r.ingredients : [],
      instructions: Array.isArray(r.instructions) ? r.instructions : [],
    }));

    return NextResponse.json({ recipes });
  } catch {
    return NextResponse.json(
      { error: 'Error al generar recetas. Intenta de nuevo.' },
      { status: 500 },
    );
  }
}
