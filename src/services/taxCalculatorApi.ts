import { TaxBracket } from '../models/TaxBracket';
import httpClient from './httpClient';


export interface TaxBracketsResponse {
  tax_brackets: TaxBracket[];
}

export const TaxCalculatorAPI = {
  fetchTaxBrackets: async (year: string): Promise<TaxBracket[]> => {
    try {
      const response = await httpClient.get<TaxBracketsResponse>(`/tax-calculator/tax-year/${year}`);
      return response.data.tax_brackets;
    /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (error: any) {
      if (error.response) {
        const { status, data } = error.response;
        if (status === 400) {
          throw new Error('Unsupported tax year. Please select a year between 2019 and 2022.');
        } else if (status >= 500) {
          throw new Error('Server error occurred. Please try again later.');
        } else {
          throw new Error(data.message || 'An error occurred while fetching tax brackets.');
        }
      } else {
        throw new Error('Network Error. Please check your internet connection.');
      }
    }
  },
};