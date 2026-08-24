import brandCodes from './brand-codes.json';
import { BrandCodeMap, BrandConfig } from './types';

const DEFAULT_BRAND_CODE_MAP = brandCodes as BrandCodeMap;
const BRAND_USERS_KEY = 'dx_brand_users';

export const sanitizeBrandCodeMap = (value: unknown): BrandCodeMap => {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return {};
  }

  const cleaned: BrandCodeMap = {};
  for (const [code, config] of Object.entries(value as Record<string, unknown>)) {
    const normalizedCode = code.trim();
    if (config && typeof config === 'object') {
      const configObj = config as Record<string, unknown>;
      const name = typeof configObj.name === 'string' ? configObj.name.trim() : '';
      const url = typeof configObj.url === 'string' ? configObj.url.trim() : '';
      if (normalizedCode && name) {
        cleaned[normalizedCode] = { name, url };
      }
    }
  }
  return cleaned;
};

export const getBrandCodeMap = (): BrandCodeMap => {
  if (typeof window === 'undefined') return { ...DEFAULT_BRAND_CODE_MAP };
  try {
    const stored = localStorage.getItem(BRAND_USERS_KEY);
    if (!stored) {
      return { ...DEFAULT_BRAND_CODE_MAP };
    }
    const parsed = JSON.parse(stored);
    const cleaned = sanitizeBrandCodeMap(parsed);
    if (Object.keys(cleaned).length === 0) {
      return { ...DEFAULT_BRAND_CODE_MAP };
    }
    return cleaned;
  } catch {
    return { ...DEFAULT_BRAND_CODE_MAP };
  }
};

export const saveBrandCodeMap = (map: BrandCodeMap) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(BRAND_USERS_KEY, JSON.stringify(map));
  }
};

export const validateBrandCode = (code: string): { isValid: boolean; config?: BrandConfig } => {
  const map = getBrandCodeMap();
  const config = map[code.trim()];
  if (config) {
    return { isValid: true, config };
  }
  return { isValid: false };
};
