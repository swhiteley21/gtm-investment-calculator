// Currency type definitions and constants

export type CurrencyCode = 'GBP' | 'USD' | 'EUR' | 'CAD';

export interface Currency {
  code: CurrencyCode;
  symbol: string;
  name: string;
  locale: string;
}

export interface ExchangeRates {
  base: CurrencyCode;
  rates: Record<CurrencyCode, number>;
  timestamp: number;
  expiresAt: number;
}

// Supported currencies
export const CURRENCIES: Record<CurrencyCode, Currency> = {
  GBP: { code: 'GBP', symbol: '£', name: 'British Pound', locale: 'en-GB' },
  USD: { code: 'USD', symbol: '$', name: 'US Dollar', locale: 'en-US' },
  EUR: { code: 'EUR', symbol: '€', name: 'Euro', locale: 'en-IE' },
  CAD: { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar', locale: 'en-CA' },
};

// Fallback rates (used when API fails)
export const FALLBACK_RATES: Record<CurrencyCode, number> = {
  GBP: 1.0,
  USD: 1.27,
  EUR: 1.17,
  CAD: 1.72,
};

// Cache configuration
export const CACHE_DURATION = 60 * 60 * 1000; // 1 hour in milliseconds
export const STORAGE_KEYS = {
  CURRENCY: 'gtm-calculator-currency',
  RATES: 'gtm-calculator-rates',
} as const;
