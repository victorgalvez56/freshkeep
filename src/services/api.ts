import { ScannedProductData } from './labelScanner';
import { FoodItem, RecipeSuggestion } from '../types';

const API_BASE = 'https://v0-freshkeep.vercel.app/api';

export async function scanLabel(imageBase64: string): Promise<ScannedProductData> {
  const response = await fetch(`${API_BASE}/scan-label`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ imageBase64 }),
  });

  if (!response.ok) {
    const data = await response.json().catch(() => null);
    throw new Error(data?.error ?? `Error del servidor (${response.status}).`);
  }

  return response.json();
}

export async function generateRecipes(
  items: FoodItem[],
  count: number = 3,
): Promise<RecipeSuggestion[]> {
  const payload = items.map(item => ({
    name: item.name,
    quantity: item.quantity,
    unit: item.unit,
    expirationDate: item.expirationDate,
  }));

  const response = await fetch(`${API_BASE}/generate-recipes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ items: payload, count }),
  });

  if (!response.ok) {
    const data = await response.json().catch(() => null);
    throw new Error(data?.error ?? `Error del servidor (${response.status}).`);
  }

  const data = await response.json();
  return data.recipes;
}
