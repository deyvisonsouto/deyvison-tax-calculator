// src/components/LanguageSwitcher.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './LanguageSwitcher.module.scss';

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const currentLanguage = i18n.language || 'en';

  return (
    <div className={styles['language-switcher']}>
      <button
        onClick={() => changeLanguage('en')}
        className={currentLanguage === 'en' ? styles.active : ''}
      >
        English
      </button>
      <span className={styles.separator}>|</span>
      <button
        onClick={() => changeLanguage('fr')}
        className={currentLanguage === 'fr' ? styles.active : ''}
      >
        Français
      </button>
    </div>
  );
};

export default LanguageSwitcher;
