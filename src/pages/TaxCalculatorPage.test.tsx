import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import TaxCalculatorPage from './TaxCalculatorPage';
import { TaxCalculatorAPI } from '../services/taxCalculatorApi';


jest.mock('../services/taxCalculatorApi');

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => {
  const originalModule = jest.requireActual('react-router-dom');
  return {
    __esModule: true,
    ...originalModule,
    useNavigate: () => mockNavigate,
  };
});

// Mock useTranslation from react-i18next
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: { [key: string]: string } = {
        annualIncome: 'Annual Income',
        taxYear: 'Tax Year',
        calculate: 'Calculate',
        loading: 'Loading...',
        error: 'An error occurred.',
        taxCalculator: 'Tax Calculator',
      };
      return translations[key] || key;
    },
  }),
}));

describe('TaxCalculatorPage Component', () => {
  const mockFetchTaxBrackets = TaxCalculatorAPI.fetchTaxBrackets as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders the TaxForm component', () => {
    render(
      <MemoryRouter>
        <TaxCalculatorPage />
      </MemoryRouter>,
    );

    expect(screen.getByLabelText(/Annual Income/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Tax Year/i)).toBeInTheDocument();
  });

  test('displays an error when API call fails', async () => {
    mockFetchTaxBrackets.mockRejectedValue(new Error('API Error'));

    render(
      <MemoryRouter>
        <TaxCalculatorPage />
      </MemoryRouter>,
    );

    fireEvent.change(screen.getByLabelText(/Annual Income/i), {
      target: { value: '50000' },
    });
    fireEvent.change(screen.getByLabelText(/Tax Year/i), {
      target: { value: '2022' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Calculate/i }));

    await waitFor(() => {
      expect(screen.getByText(/API Error/i)).toBeInTheDocument();
    });
  });
});
