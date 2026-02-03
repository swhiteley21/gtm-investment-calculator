'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Globe, Check, AlertCircle } from 'lucide-react';
import { useCurrency } from '../lib/context/currency-context';
import { CURRENCIES, CurrencyCode } from '../lib/types/currency';

export function CurrencySelector() {
  const { currency, setCurrency, isLoadingRates, ratesError } = useCurrency();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleCurrencySelect = (code: CurrencyCode) => {
    setCurrency(code);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-2 py-1 text-[10px] font-mono text-[#1F1E24] hover:bg-[#F5F5F5] rounded transition-colors"
        title="Change currency"
      >
        <Globe className="w-3 h-3" />
        <span>{currency}</span>
        {ratesError && (
          <AlertCircle className="w-3 h-3 text-amber-600" title="Using fallback rates" />
        )}
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute top-full right-0 mt-1 w-48 bg-white border border-[#E5E5E5] rounded-lg shadow-lg z-50">
          <div className="py-1">
            {isLoadingRates && (
              <div className="px-3 py-2 text-xs text-[#666666]">
                Loading rates...
              </div>
            )}

            {Object.entries(CURRENCIES).map(([code, currencyInfo]) => (
              <button
                key={code}
                onClick={() => handleCurrencySelect(code as CurrencyCode)}
                className="w-full flex items-center justify-between px-3 py-2 text-xs hover:bg-[#F5F5F5] transition-colors text-left"
              >
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[#1F1E24] font-medium">
                    {currencyInfo.symbol}
                  </span>
                  <div>
                    <div className="text-[#1F1E24] font-medium">
                      {currencyInfo.code}
                    </div>
                    <div className="text-[#666666]">{currencyInfo.name}</div>
                  </div>
                </div>
                {currency === code && (
                  <Check className="w-4 h-4 text-[#1F1E24]" />
                )}
              </button>
            ))}
          </div>

          {ratesError && (
            <div className="border-t border-[#E5E5E5] px-3 py-2 text-[10px] text-amber-700 bg-amber-50">
              Using fallback rates
            </div>
          )}
        </div>
      )}
    </div>
  );
}
