import React from 'react';
import { TaxCalculationResult } from '../models/TaxCalculationResult';
import { useTranslation } from 'react-i18next';

interface TaxResultsProps {
  data: TaxCalculationResult;
}

const TaxResults: React.FC<TaxResultsProps> = ({ data }) => {
  const { t } = useTranslation(); // Get the translation function
  const { totalTax, taxesPerBand, effectiveRate } = data;

  return (
    <div>
      <h2>{t('taxResults')}</h2>
      <p>
        {t('totalTaxesOwed')}: ${totalTax}
      </p>
      <p>
        {t('effectiveTaxRate')}: {effectiveRate}%
      </p>
      <h3>{t('taxesPerBand')}:</h3>
      <ul>
        {taxesPerBand.map((band, index) => (
          <li key={index}>
            {t('bandLabel', {
              bracket: band.bracket,
              rate: (band.rate * 100).toFixed(2),
              tax: band.tax,
            })}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaxResults;
