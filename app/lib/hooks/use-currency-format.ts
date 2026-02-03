import { useCallback } from 'react';
import { useCurrency } from '../context/currency-context';
import { formatCurrency as formatCurrencyUtil } from '../utils/currency-formatter';

/**
 * Hook for formatting currency values with current currency and rates
 */
export function useCurrencyFormat() {
  const { currency, rates } = useCurrency();

  const format = useCallback(
    (amount: number): string => {
      const rate = rates.rates[currency];
      return formatCurrencyUtil(amount, currency, rate);
    },
    [currency, rates]
  );

  return { format };
}
