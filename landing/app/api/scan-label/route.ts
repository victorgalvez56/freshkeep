import { NextRequest, NextResponse } from 'next/server';
import { checkLimit } from '../_lib/rateLimit';

const VALID_CATEGORIES = [
  'fruits', 'vegetables', 'dairy', 'cereals', 'canned',
  'meat', 'frozen', 'beverages', 'condiments', 'snacks', 'other',
];

const VALID_LOCATIONS = ['fridge', 'freezer', 'pantry', 'counter'];

const SYSTEM_PROMPT = `Eres un asistente experto en identificar productos alimenticios a partir de fotos. Analiza TODA la imagen completa, no solo la etiqueta principal. La fecha de vencimiento puede estar impresa en cualquier parte del empaque: bordes, costados, parte trasera, sellos, o estampada fuera de la etiqueta. Busca textos como "Vence", "Vto", "Exp", "F.V.", "Fecha de vencimiento", "Best before", "Use by", o cualquier fecha visible en la imagen. Responde UNICAMENTE con un JSON valido, sin texto adicional:

{
  "name": "Nombre del producto",
  "expirationDate": "YYYY-MM-DD",
  "category": "una de: ${VALID_CATEGORIES.join(', ')}",
  "quantity": 1,
  "unit": "kg, g, L, mL, pzas, etc.",
  "storageLocation": "una de: ${VALID_LOCATIONS.join(', ')}",
  "price": 0.00
}

Notas:
- La fecha debe estar en formato YYYY-MM-DD. Si el formato original es DD/MM/YYYY o MM/DD/YYYY, conviertelo
- La categoria debe ser exactamente uno de los valores listados
- La ubicacion (storageLocation) debe ser exactamente uno de los valores listados
- Si no puedes identificar un campo con certeza, no lo incluyas
- Para storageLocation, usa tu conocimiento sobre el producto para sugerir donde almacenarlo`;

export async function POST(request: NextRequest) {
  const deviceId = request.headers.get('x-device-id');
  if (!deviceId) {
    return NextResponse.json({ error: 'Se requiere identificador de dispositivo.' }, { status: 400 });
  }

  const { ok, remaining } = checkLimit(deviceId, 'scans');
  if (!ok) {
    return NextResponse.json(
      { error: 'Has alcanzado el limite diario de escaneos (5/dia). Intenta manana.' },
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

  let body: { imageBase64?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Body invalido.' }, { status: 400 });
  }

  if (!body.imageBase64 || typeof body.imageBase64 !== 'string') {
    return NextResponse.json({ error: 'Se requiere imageBase64.' }, { status: 400 });
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: 'Analiza esta foto de producto alimenticio. Extrae nombre, peso, precio y categoria de la etiqueta. IMPORTANTE: busca la fecha de vencimiento en TODA la imagen, incluyendo bordes, costados y texto impreso fuera de la etiqueta principal.',
              },
              {
                type: 'image_url',
                image_url: {
                  url: `data:image/jpeg;base64,${body.imageBase64}`,
                  detail: 'high',
                },
              },
            ],
          },
        ],
        temperature: 0.2,
        max_tokens: 500,
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

    // Parse JSON from response
    let parsed: Record<string, unknown>;
    try {
      parsed = JSON.parse(content);
    } catch {
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        return NextResponse.json(
          { error: 'No se pudo interpretar la etiqueta. Intenta con una foto mas clara.' },
          { status: 422 },
        );
      }
      parsed = JSON.parse(jsonMatch[0]);
    }

    // Validate and sanitize fields
    const result: Record<string, unknown> = {};

    if (parsed.name && typeof parsed.name === 'string') {
      result.name = parsed.name;
    }
    if (parsed.expirationDate && typeof parsed.expirationDate === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(parsed.expirationDate as string)) {
      result.expirationDate = parsed.expirationDate;
    }
    if (parsed.category && VALID_CATEGORIES.includes(parsed.category as string)) {
      result.category = parsed.category;
    }
    if (parsed.quantity != null && typeof parsed.quantity === 'number' && (parsed.quantity as number) > 0) {
      result.quantity = parsed.quantity;
    }
    if (parsed.unit && typeof parsed.unit === 'string') {
      result.unit = parsed.unit;
    }
    if (parsed.storageLocation && VALID_LOCATIONS.includes(parsed.storageLocation as string)) {
      result.storageLocation = parsed.storageLocation;
    }
    if (parsed.price != null && typeof parsed.price === 'number' && (parsed.price as number) > 0) {
      result.price = parsed.price;
    }

    return NextResponse.json(result);
  } catch {
    return NextResponse.json(
      { error: 'No se pudo interpretar la etiqueta. Intenta con una foto mas clara.' },
      { status: 500 },
    );
  }
}
