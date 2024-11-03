// src/App.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { MemoryRouter } from 'react-router-dom';

// Mock the TaxCalculatorAPI and axios to prevent actual API calls during tests
jest.mock('./services/taxCalculatorApi');
jest.mock('axios');

describe('App Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders TaxCalculatorPage when path is "/"', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    // Check for an element that exists in TaxCalculatorPage
    // Assuming TaxCalculatorPage contains a heading with text "Tax Calculator"
    expect(screen.getByText(/Tax Calculator/i)).toBeInTheDocument();
  });

  test('renders NotFoundPage for unknown routes', () => {
    render(
      <MemoryRouter initialEntries={['/unknown']}>
        <App />
      </MemoryRouter>
    );

    // Check for an element that exists in NotFoundPage
    // Assuming NotFoundPage contains a heading with text "Page Not Found"
    expect(screen.getByText(/Page Not Found/i)).toBeInTheDocument();
  });
});
