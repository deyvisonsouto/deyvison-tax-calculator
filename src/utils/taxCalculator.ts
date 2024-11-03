// src/utils/taxCalculator.ts

import { TaxBracket } from "../models/TaxBracket";
import { TaxCalculationResult, TaxesPerBand } from "../models/TaxCalculationResult";

export const calculateTaxes = (income: number, taxBrackets: TaxBracket[]): TaxCalculationResult => {
  let remainingIncome = income;
  let totalTax = 0;
  const taxesPerBand: TaxesPerBand[] = [];

  for (const bracket of taxBrackets) {
    const min = bracket.min;
    const max = bracket.max ?? Infinity;
    const rate = bracket.rate;

    const taxableIncome = Math.min(remainingIncome, max - min);

    if (taxableIncome > 0) {
      const tax = taxableIncome * rate;
      taxesPerBand.push({
        bracket: `${min} - ${bracket.max ?? '∞'}`,
        rate,
        tax: tax.toFixed(2),
      });
      totalTax += tax;
      remainingIncome -= taxableIncome;
    }

    if (remainingIncome <= 0) break;
  }

  const effectiveRate = income > 0 ? (totalTax / income) * 100 : 0;

  return {
    totalTax: totalTax.toFixed(2),
    taxesPerBand,
    effectiveRate: effectiveRate.toFixed(2),
  };
};
