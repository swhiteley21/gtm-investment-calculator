'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { CurrencyCode, ExchangeRates } from '../types/currency';
import {
  detectDefaultCurrency,
  saveCurrencyPreference,
} from '../services/currency-detection';
import {
  getExchangeRates,
  getFallbackRates,
} from '../services/exchange-rate';

interface CurrencyContextValue {
  currency: CurrencyCode;
  rates: ExchangeRates;
  isLoadingRates: boolean;
  ratesError: boolean;
  setCurrency: (currency: CurrencyCode) => void;
  refreshRates: () => Promise<void>;
}

const CurrencyContext = createContext<CurrencyContextValue | undefined>(
  undefined
);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState<CurrencyCode>('GBP');
  const [rates, setRates] = useState<ExchangeRates>(getFallbackRates());
  const [isLoadingRates, setIsLoadingRates] = useState(true);
  const [ratesError, setRatesError] = useState(false);

  // Initialize currency and rates on mount
  useEffect(() => {
    // Detect default currency
    const detectedCurrency = detectDefaultCurrency();
    setCurrencyState(detectedCurrency);

    // Load exchange rates
    loadRates();
  }, []);

  const loadRates = async () => {
    setIsLoadingRates(true);
    setRatesError(false);

    try {
      const fetchedRates = await getExchangeRates();
      setRates(fetchedRates);

      // Check if we're using fallback rates
      const isFallback =
        fetchedRates.timestamp === getFallbackRates().timestamp;
      setRatesError(isFallback);
    } catch (error) {
      console.error('Failed to load exchange rates:', error);
      setRates(getFallbackRates());
      setRatesError(true);
    } finally {
      setIsLoadingRates(false);
    }
  };

  const setCurrency = (newCurrency: CurrencyCode) => {
    setCurrencyState(newCurrency);
    saveCurrencyPreference(newCurrency);
  };

  const refreshRates = async () => {
    await loadRates();
  };

  const value: CurrencyContextValue = {
    currency,
    rates,
    isLoadingRates,
    ratesError,
    setCurrency,
    refreshRates,
  };

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);

  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }

  return context;
}
