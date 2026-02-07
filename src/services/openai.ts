import { FoodItem, RecipeSuggestion } from '../types';
import { daysUntilExpiration } from '../utils/dates';
import { AIConfig, chatCompletion } from '../constants/ai';

export async function generateRecipeSuggestions(
  config: AIConfig,
  inventoryItems: FoodItem[],
  count: number = 3
): Promise<RecipeSuggestion[]> {
  const inventoryList = inventoryItems
    .map(item => {
      const days = daysUntilExpiration(item.expirationDate);
      const urgency = days <= 0 ? '(VENCIDO)' : days <= 2 ? '(por vencer)' : '';
      return `- ${item.name}: ${item.quantity} ${item.unit} ${urgency}`;
    })
    .join('\n');

  const systemPrompt = `Eres un chef nutricionista experto. Tu trabajo es sugerir recetas saludables y practicas usando los ingredientes disponibles del usuario. SIEMPRE responde en espanol. Prioriza usar ingredientes que estan por vencer o vencidos recientemente. Responde UNICAMENTE con un JSON valido, sin texto adicional, con el siguiente formato:
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

  const userPrompt = `Tengo estos ingredientes en mi inventario:\n${inventoryList}\n\nSugiere ${count} recetas que pueda preparar con estos ingredientes. Prioriza usar los ingredientes que estan por vencer. Los valores nutricionales deben ser estimaciones razonables por porcion.`;

  const content = await chatCompletion(
    config,
    config.model,
    [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt },
    ],
    { temperature: 0.7, maxTokens: 2000 },
  );

  let parsed: { recipes: RecipeSuggestion[] };
  try {
    parsed = JSON.parse(content);
  } catch {
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('La respuesta no contiene un formato valido.');
    }
    try {
      parsed = JSON.parse(jsonMatch[0]);
    } catch {
      throw new Error('No se pudo interpretar la respuesta de la IA.');
    }
  }

  if (!parsed.recipes || !Array.isArray(parsed.recipes)) {
    throw new Error('La respuesta no contiene recetas validas.');
  }

  return parsed.recipes.map(r => ({
    name: r.name || 'Receta sin nombre',
    emoji: r.emoji || '🍽️',
    description: r.description || '',
    servingSize: r.servingSize || '1 porcion',
    calories: Number(r.calories) || 0,
    protein: Number(r.protein) || 0,
    fats: Number(r.fats) || 0,
    carbs: Number(r.carbs) || 0,
    ingredients: Array.isArray(r.ingredients) ? r.ingredients : [],
    instructions: Array.isArray(r.instructions) ? r.instructions : [],
  }));
}

export function matchIngredientsToInventory(
  ingredients: string[],
  inventory: FoodItem[]
): { ingredient: string; matchedItem: FoodItem | null }[] {
  return ingredients.map(ingredient => {
    const lower = ingredient.toLowerCase();
    const matched = inventory.find(item =>
      lower.includes(item.name.toLowerCase()) ||
      item.name.toLowerCase().includes(lower.split(/\d/)[0].trim())
    );
    return { ingredient, matchedItem: matched ?? null };
  });
}
