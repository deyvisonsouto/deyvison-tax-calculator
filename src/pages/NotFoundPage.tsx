// src/pages/NotFoundPage.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const NotFoundPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h2>{t('pageNotFound')}</h2>
      <p>{t('error')}</p>
      <Link to="/">{t('goToHome')}</Link>
    </div>
  );
};

export default NotFoundPage;
