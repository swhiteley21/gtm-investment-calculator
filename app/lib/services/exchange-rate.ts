// Exchange rate service for fetching and caching currency rates

import {
  CurrencyCode,
  ExchangeRates,
  FALLBACK_RATES,
  CACHE_DURATION,
  STORAGE_KEYS,
} from '../types/currency';

const API_URL = 'https://api.exchangerate-api.com/v4/latest/GBP';

/**
 * Fetch exchange rates from API
 */
export async function fetchExchangeRates(): Promise<ExchangeRates> {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();

    const now = Date.now();
    const rates: ExchangeRates = {
      base: 'GBP',
      rates: {
        GBP: 1.0,
        USD: data.rates.USD || FALLBACK_RATES.USD,
        EUR: data.rates.EUR || FALLBACK_RATES.EUR,
        CAD: data.rates.CAD || FALLBACK_RATES.CAD,
      },
      timestamp: now,
      expiresAt: now + CACHE_DURATION,
    };

    return rates;
  } catch (error) {
    console.warn('Failed to fetch exchange rates, using fallback:', error);
    return getFallbackRates();
  }
}

/**
 * Load cached rates from localStorage
 */
export function loadCachedRates(): ExchangeRates | null {
  try {
    const cached = localStorage.getItem(STORAGE_KEYS.RATES);

    if (!cached) {
      return null;
    }

    const rates: ExchangeRates = JSON.parse(cached);

    // Check if cache is expired
    if (Date.now() > rates.expiresAt) {
      localStorage.removeItem(STORAGE_KEYS.RATES);
      return null;
    }

    return rates;
  } catch (error) {
    console.warn('Failed to load cached rates:', error);
    return null;
  }
}

/**
 * Save rates to localStorage cache
 */
export function saveCachedRates(rates: ExchangeRates): void {
  try {
    localStorage.setItem(STORAGE_KEYS.RATES, JSON.stringify(rates));
  } catch (error) {
    console.warn('Failed to save rates to cache:', error);
  }
}

/**
 * Get fallback rates (used when API fails)
 */
export function getFallbackRates(): ExchangeRates {
  const now = Date.now();
  return {
    base: 'GBP',
    rates: FALLBACK_RATES,
    timestamp: now,
    expiresAt: now + CACHE_DURATION,
  };
}

/**
 * Get exchange rates (from cache or API)
 */
export async function getExchangeRates(): Promise<ExchangeRates> {
  // Try to load from cache first
  const cached = loadCachedRates();
  if (cached) {
    return cached;
  }

  // Fetch fresh rates from API
  const rates = await fetchExchangeRates();
  saveCachedRates(rates);

  return rates;
}
