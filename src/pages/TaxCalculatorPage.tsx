import React, { useState } from 'react';
import { TaxCalculatorAPI } from '../services/taxCalculatorApi';
import TaxForm from '../components/TaxForm';
import TaxResults from '../components/TaxResults';
import { calculateTaxes } from '../utils/taxCalculator';
import { TaxCalculationResult } from '../models/TaxCalculationResult';
import { useTranslation } from 'react-i18next';

const TaxCalculatorPage: React.FC = () => {
  const { t } = useTranslation(); // Get the translation function
  const [results, setResults] = useState<TaxCalculationResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleCalculate = async (income: number, year: string) => {
    setError(null);
    setResults(null);
    setIsLoading(true);
    try {
      const taxBrackets = await TaxCalculatorAPI.fetchTaxBrackets(year);
      const data = calculateTaxes(income, taxBrackets);
      setResults(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || t('error'));
      } else {
        setError(t('error'));
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1>{t('taxCalculator')}</h1>
      <TaxForm onCalculate={handleCalculate} />
      {isLoading && <p>{t('loading')}</p>}
      {error && <p className="error">{error}</p>}
      {results && <TaxResults data={results} />}
    </div>
  );
};

export default TaxCalculatorPage;
