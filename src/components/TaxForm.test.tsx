import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import TaxForm from './TaxForm';

// Mock useTranslation from react-i18next
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: { [key: string]: string } = {
        annualIncome: 'Annual Income',
        taxYear: 'Tax Year',
        calculate: 'Calculate',
        pleaseProvideIncome: 'Please provide your annual income.',
        pleaseEnterValidIncome: 'Please enter a valid income.',
      };
      return translations[key] || key;
    },
  }),
}));

describe('TaxForm Component', () => {
  const mockOnCalculate = jest.fn();

  beforeEach(() => {
    mockOnCalculate.mockClear();
  });

  test('renders the form correctly', () => {
    render(<TaxForm onCalculate={mockOnCalculate} />);

    expect(screen.getByLabelText(/Annual Income/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Tax Year/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Calculate/i })).toBeInTheDocument();
  });

  test('displays an error when income is not provided', () => {
    render(<TaxForm onCalculate={mockOnCalculate} />);

    fireEvent.click(screen.getByRole('button', { name: /Calculate/i }));

    expect(screen.getByText(/Please provide your annual income./i)).toBeInTheDocument();
    expect(mockOnCalculate).not.toHaveBeenCalled();
  });

  test('displays an error when income is negative', () => {
    render(<TaxForm onCalculate={mockOnCalculate} />);

    fireEvent.change(screen.getByLabelText(/Annual Income/i), { target: { value: '-50000' } });
    fireEvent.click(screen.getByRole('button', { name: /Calculate/i }));

    expect(screen.getByText(/Please enter a valid income./i)).toBeInTheDocument();
    expect(mockOnCalculate).not.toHaveBeenCalled();
  });

  test('calls onCalculate with correct values', () => {
    render(<TaxForm onCalculate={mockOnCalculate} />);

    fireEvent.change(screen.getByLabelText(/Annual Income/i), { target: { value: '50000' } });
    fireEvent.change(screen.getByLabelText(/Tax Year/i), { target: { value: '2021' } });
    fireEvent.click(screen.getByRole('button', { name: /Calculate/i }));

    expect(mockOnCalculate).toHaveBeenCalledWith(50000, '2021');
  });

  test('selects the default tax year', () => {
    render(<TaxForm onCalculate={mockOnCalculate} />);

    const taxYearSelect = screen.getByLabelText(/Tax Year/i) as HTMLSelectElement;
    expect(taxYearSelect.value).toBe('2022');
  });
});
