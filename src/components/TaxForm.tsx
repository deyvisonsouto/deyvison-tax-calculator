// src/components/TaxForm.tsx
import React, { useState, FormEvent } from 'react';
import styles from './TaxForm.module.scss';
import { useTranslation } from 'react-i18next';

interface TaxFormProps {
  onCalculate: (income: number, year: string) => void;
}

const TaxForm: React.FC<TaxFormProps> = ({ onCalculate }) => {
  const { t } = useTranslation();
  const [income, setIncome] = useState<string>('');
  const [year, setYear] = useState<string>('2022'); // Default to the latest year
  const [errors, setErrors] = useState<string>('');

  const supportedYears = ['2022', '2021', '2020', '2019'];

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setErrors('');

    if (!income) {
      setErrors(t('pleaseProvideIncome'));
      return;
    }

    const incomeValue = parseFloat(income);
    if (isNaN(incomeValue) || incomeValue < 0) {
      setErrors(t('pleaseEnterValidIncome'));
      return;
    }

    onCalculate(incomeValue, year);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles['form-group']}>
        <label htmlFor="income">{t('annualIncome')}:</label>
        <input
          id="income"
          type="number"
          value={income}
          onChange={(e) => setIncome(e.target.value)}
          required
        />
      </div>
      <div className={styles['form-group']}>
        <label htmlFor="year">{t('taxYear')}:</label>
        <select
          id="year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          required
        >
          {supportedYears.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
      </div>
      {errors && <p className={styles.error}>{errors}</p>}
      <button type="submit">{t('calculate')}</button>
    </form>
  );
};

export default TaxForm;
