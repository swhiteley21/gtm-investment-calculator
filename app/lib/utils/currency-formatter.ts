// Currency formatting utility

import { CurrencyCode, CURRENCIES } from '../types/currency';

/**
 * Format amount with currency symbol and proper locale
 * @param amount - Amount in base currency (GBP)
 * @param currencyCode - Target currency code
 * @param exchangeRate - Exchange rate to target currency
 * @returns Formatted currency string
 */
export function formatCurrency(
  amount: number,
  currencyCode: CurrencyCode,
  exchangeRate: number
): string {
  // Return dash for zero amounts (preserve existing behavior)
  if (amount === 0) {
    return '—';
  }

  // Convert amount using exchange rate
  const convertedAmount = amount * exchangeRate;

  // Get currency configuration
  const currency = CURRENCIES[currencyCode];

  // Format using Intl.NumberFormat for proper locale formatting
  const formatter = new Intl.NumberFormat(currency.locale, {
    style: 'currency',
    currency: currencyCode,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  return formatter.format(convertedAmount);
}
