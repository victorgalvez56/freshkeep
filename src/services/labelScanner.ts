import { FoodCategory, StorageLocation } from '../types';
import { scanLabel } from './api';

export interface ScannedProductData {
  name?: string;
  expirationDate?: string;
  category?: FoodCategory;
  quantity?: number;
  unit?: string;
  storageLocation?: StorageLocation;
  price?: number;
}

export async function scanProductLabel(
  imageBase64: string,
): Promise<ScannedProductData> {
  return scanLabel(imageBase64);
}
