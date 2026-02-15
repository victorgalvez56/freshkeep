import { FoodItem, RecipeSuggestion } from '../types';
import { generateRecipes } from './api';

export async function generateRecipeSuggestions(
  inventoryItems: FoodItem[],
  count: number = 3
): Promise<RecipeSuggestion[]> {
  return generateRecipes(inventoryItems, count);
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
