import React from 'react';
import { render, screen } from '@testing-library/react';
import TaxResults from './TaxResults';
import { TaxCalculationResult, TaxesPerBand } from '../models/TaxCalculationResult';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, options?: TaxesPerBand) => {
      const translations: { [key: string]: string } = {
        taxResults: 'Tax Results',
        totalTaxesOwed: 'Total Taxes Owed',
        effectiveTaxRate: 'Effective Tax Rate',
        taxesPerBand: 'Taxes Per Band',
        bandLabel: `Band ${options?.bracket} at ${options?.rate}%: $${options?.tax}`,
      };
      return translations[key] || key;
    },
  }),
}));

describe('TaxResults Component', () => {
  const mockData: TaxCalculationResult = {
    totalTax: '7500.00',
    effectiveRate: '15.00',
    taxesPerBand: [
      {
        bracket: '0 - 50197',
        rate: 0.15,
        tax: '7500.00',
      },
    ],
  };

  test('renders the results correctly', () => {
    render(<TaxResults data={mockData} />);

    expect(screen.getByText(/Tax Results/i)).toBeInTheDocument();
    expect(screen.getByText(/Total Taxes Owed/i)).toHaveTextContent('Total Taxes Owed: $7500.00');
    expect(screen.getByText(/Effective Tax Rate/i)).toHaveTextContent('Effective Tax Rate: 15.00%');
    expect(screen.getByText(/Taxes Per Band/i)).toBeInTheDocument();
    expect(screen.getByText(/Band 0 - 50197 at 15.00%: \$7500.00/i)).toBeInTheDocument();
  });

  test('renders multiple tax bands correctly', () => {
    const multiBandData: TaxCalculationResult = {
      totalTax: '17739.17',
      effectiveRate: '17.74',
      taxesPerBand: [
        {
          bracket: '0 - 50197',
          rate: 0.15,
          tax: '7529.55',
        },
        {
          bracket: '50197 - 100392',
          rate: 0.205,
          tax: '10209.62',
        },
      ],
    };

    render(<TaxResults data={multiBandData} />);

    expect(screen.getByText(/Total Taxes Owed/i)).toHaveTextContent('Total Taxes Owed: $17739.17');
    expect(screen.getByText(/Effective Tax Rate/i)).toHaveTextContent('Effective Tax Rate: 17.74%');
    expect(screen.getByText(/Band 0 - 50197 at 15.00%: \$7529.55/i)).toBeInTheDocument();
    expect(screen.getByText(/Band 50197 - 100392 at 20.50%: \$10209.62/i)).toBeInTheDocument();
  });
});
