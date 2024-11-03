export interface TaxesPerBand {
  bracket: string;
  rate: number;
  tax: string;
}

export interface TaxCalculationResult {
  totalTax: string;
  taxesPerBand: TaxesPerBand[];
  effectiveRate: string;
}