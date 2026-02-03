// Currency detection and preference management

import { CurrencyCode, CURRENCIES, STORAGE_KEYS } from '../types/currency';

/**
 * Detect default currency from browser locale or timezone
 */
export function detectDefaultCurrency(): CurrencyCode {
  // 1. Check localStorage for saved preference
  const saved = loadCurrencyPreference();
  if (saved) {
    return saved;
  }

  // 2. Check browser locale
  const locale = navigator.language;
  if (locale.startsWith('en-US')) return 'USD';
  if (locale.startsWith('en-CA')) return 'CAD';
  if (locale.startsWith('en-GB')) return 'GBP';
  if (locale.startsWith('en-IE')) return 'EUR';

  // Check for other Euro zone locales
  const euroLocales = ['de', 'fr', 'es', 'it', 'nl', 'pt', 'fi', 'at', 'be'];
  if (euroLocales.some((prefix) => locale.startsWith(prefix))) {
    return 'EUR';
  }

  // 3. Check timezone as fallback
  try {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    if (timezone.startsWith('America/')) {
      // North American timezones
      if (
        timezone.includes('Vancouver') ||
        timezone.includes('Toronto') ||
        timezone.includes('Montreal')
      ) {
        return 'CAD';
      }
      return 'USD'; // Default to USD for other Americas
    }

    if (timezone.startsWith('Europe/')) {
      if (timezone.includes('London')) {
        return 'GBP';
      }
      return 'EUR'; // Default to EUR for other Europe
    }
  } catch (error) {
    console.warn('Failed to detect timezone:', error);
  }

  // 4. Default to GBP
  return 'GBP';
}

/**
 * Load currency preference from localStorage
 */
export function loadCurrencyPreference(): CurrencyCode | null {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.CURRENCY);

    if (!saved) {
      return null;
    }

    // Validate that it's a supported currency
    if (saved in CURRENCIES) {
      return saved as CurrencyCode;
    }

    // Invalid currency, clear it
    localStorage.removeItem(STORAGE_KEYS.CURRENCY);
    return null;
  } catch (error) {
    console.warn('Failed to load currency preference:', error);
    return null;
  }
}

/**
 * Save currency preference to localStorage
 */
export function saveCurrencyPreference(currency: CurrencyCode): void {
  try {
    // Validate currency before saving
    if (!(currency in CURRENCIES)) {
      console.warn(`Invalid currency code: ${currency}`);
      return;
    }

    localStorage.setItem(STORAGE_KEYS.CURRENCY, currency);
  } catch (error) {
    console.warn('Failed to save currency preference:', error);
  }
}
