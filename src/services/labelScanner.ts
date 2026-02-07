import { FoodCategory, StorageLocation } from '../types';
import { AIConfig, chatCompletion } from '../constants/ai';

export interface ScannedProductData {
  name?: string;
  expirationDate?: string;
  category?: FoodCategory;
  quantity?: number;
  unit?: string;
  storageLocation?: StorageLocation;
  price?: number;
}

const VALID_CATEGORIES: FoodCategory[] = [
  'fruits', 'vegetables', 'dairy', 'cereals', 'canned',
  'meat', 'frozen', 'beverages', 'condiments', 'snacks', 'other',
];

const VALID_LOCATIONS: StorageLocation[] = ['fridge', 'freezer', 'pantry', 'counter'];

export async function scanProductLabel(
  config: AIConfig,
  imageBase64: string,
): Promise<ScannedProductData> {
  const systemPrompt = `Eres un asistente experto en identificar productos alimenticios a partir de fotos de etiquetas. Analiza la imagen y extrae la informacion que puedas identificar. Responde UNICAMENTE con un JSON valido, sin texto adicional, con los siguientes campos (todos opcionales, incluye solo los que puedas identificar):

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
- La fecha debe estar en formato YYYY-MM-DD
- La categoria debe ser exactamente uno de los valores listados
- La ubicacion (storageLocation) debe ser exactamente uno de los valores listados
- Si no puedes identificar un campo con certeza, no lo incluyas
- Para storageLocation, usa tu conocimiento sobre el producto para sugerir donde almacenarlo`;

  const content = await chatCompletion(
    config,
    config.visionModel,
    [
      { role: 'system', content: systemPrompt },
      {
        role: 'user',
        content: [
          {
            type: 'text',
            text: 'Analiza esta etiqueta de producto alimenticio y extrae los datos que puedas identificar.',
          },
          {
            type: 'image_url',
            image_url: {
              url: `data:image/jpeg;base64,${imageBase64}`,
              detail: 'high',
            },
          },
        ],
      },
    ],
    { temperature: 0.2, maxTokens: 500 },
  );

  let parsed: ScannedProductData;
  try {
    parsed = JSON.parse(content);
  } catch {
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('No se pudo interpretar la etiqueta. Intenta con una foto mas clara.');
    }
    try {
      parsed = JSON.parse(jsonMatch[0]);
    } catch {
      throw new Error('No se pudo interpretar la etiqueta. Intenta con una foto mas clara.');
    }
  }

  const result: ScannedProductData = {};

  if (parsed.name && typeof parsed.name === 'string') {
    result.name = parsed.name;
  }
  if (parsed.expirationDate && typeof parsed.expirationDate === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(parsed.expirationDate)) {
    result.expirationDate = parsed.expirationDate;
  }
  if (parsed.category && VALID_CATEGORIES.includes(parsed.category)) {
    result.category = parsed.category;
  }
  if (parsed.quantity != null && typeof parsed.quantity === 'number' && parsed.quantity > 0) {
    result.quantity = parsed.quantity;
  }
  if (parsed.unit && typeof parsed.unit === 'string') {
    result.unit = parsed.unit;
  }
  if (parsed.storageLocation && VALID_LOCATIONS.includes(parsed.storageLocation)) {
    result.storageLocation = parsed.storageLocation;
  }
  if (parsed.price != null && typeof parsed.price === 'number' && parsed.price > 0) {
    result.price = parsed.price;
  }

  return result;
}
