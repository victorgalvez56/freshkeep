import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Crypto from 'expo-crypto';
import { ScannedProductData } from './labelScanner';
import { FoodItem, RecipeSuggestion } from '../types';

const API_BASE = 'https://v0-freshkeep.vercel.app/api';
const DEVICE_ID_KEY = '@freshkeep_device_id';

let cachedDeviceId: string | null = null;

async function getDeviceId(): Promise<string> {
  if (cachedDeviceId) return cachedDeviceId;

  let id = await AsyncStorage.getItem(DEVICE_ID_KEY);
  if (!id) {
    id = Crypto.randomUUID();
    await AsyncStorage.setItem(DEVICE_ID_KEY, id);
  }

  cachedDeviceId = id;
  return id;
}

export async function scanLabel(imageBase64: string): Promise<ScannedProductData> {
  const deviceId = await getDeviceId();

  const response = await fetch(`${API_BASE}/scan-label`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Device-ID': deviceId,
    },
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
  const deviceId = await getDeviceId();

  const payload = items.map(item => ({
    name: item.name,
    quantity: item.quantity,
    unit: item.unit,
    expirationDate: item.expirationDate,
  }));

  const response = await fetch(`${API_BASE}/generate-recipes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Device-ID': deviceId,
    },
    body: JSON.stringify({ items: payload, count }),
  });

  if (!response.ok) {
    const data = await response.json().catch(() => null);
    throw new Error(data?.error ?? `Error del servidor (${response.status}).`);
  }

  const data = await response.json();
  return data.recipes;
}
