import { TaxBracket } from '../models/TaxBracket';
import { calculateTaxes } from './taxCalculator';


const mockTaxBrackets: TaxBracket[] = [
  { min: 0, max: 50197, rate: 0.15 },
  { min: 50197, max: 100392, rate: 0.205 },
  { min: 100392, max: 155625, rate: 0.26 },
  { min: 155625, max: 221708, rate: 0.29 },
  { min: 221708, rate: 0.33 },
];

describe('calculateTaxes Utility', () => {
  test('calculates taxes correctly for $50,000 income', () => {
    const result = calculateTaxes(50000, mockTaxBrackets);
    expect(result.totalTax).toBe('7500.00');
  });

  test('calculates taxes correctly for $100,000 income', () => {
    const result = calculateTaxes(100000, mockTaxBrackets);
    expect(result.totalTax).toBe('17739.17');
  });

  test('calculates taxes correctly for $0 income', () => {
    const result = calculateTaxes(0, mockTaxBrackets);
    expect(result.totalTax).toBe('0.00');
  });

  test('calculates taxes correctly for $1,234,567 income', () => {
    const result = calculateTaxes(1234567, mockTaxBrackets);
    expect(result.totalTax).toBe('385587.65');
  });
});
