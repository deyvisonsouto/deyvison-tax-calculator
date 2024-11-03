// src/components/LanguageSwitcher.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import LanguageSwitcher from './LanguageSwitcher';
import styles from './LanguageSwitcher.module.scss';
import { useTranslation } from 'react-i18next';

// Mock useTranslation and i18n
const changeLanguageMock = jest.fn();

jest.mock('react-i18next', () => ({
  useTranslation: jest.fn(),
}));

describe('LanguageSwitcher Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (useTranslation as jest.Mock).mockReturnValue({
      i18n: {
        changeLanguage: changeLanguageMock,
        language: 'en',
      },
    });
  });

  test('renders language buttons', () => {
    render(<LanguageSwitcher />);

    expect(screen.getByText('English')).toBeInTheDocument();
    expect(screen.getByText('Français')).toBeInTheDocument();
  });

  test('applies active class to the current language', () => {
    render(<LanguageSwitcher />);

    const englishButton = screen.getByText('English');
    const frenchButton = screen.getByText('Français');

    expect(englishButton).toHaveClass(styles.active);
    expect(frenchButton).not.toHaveClass(styles.active);
  });

  test('changes language when a button is clicked', () => {
    render(<LanguageSwitcher />);

    const frenchButton = screen.getByText('Français');
    fireEvent.click(frenchButton);

    expect(changeLanguageMock).toHaveBeenCalledWith('fr');
  });

  test('updates active class after language change', () => {
    const { rerender } = render(<LanguageSwitcher />);

    const frenchButton = screen.getByText('Français');
    fireEvent.click(frenchButton);

    // Update the mock to return 'fr' for the current language
    (useTranslation as jest.Mock).mockReturnValue({
      i18n: {
        changeLanguage: changeLanguageMock,
        language: 'fr',
      },
    });

    // Rerender the component to reflect the updated language
    rerender(<LanguageSwitcher />);

    const englishButton = screen.getByText('English');

    expect(frenchButton).toHaveClass(styles.active);
    expect(englishButton).not.toHaveClass(styles.active);
  });
});
