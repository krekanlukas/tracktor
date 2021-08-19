import { createContext, FC, useCallback, useContext } from 'react';

import { translations } from '@/config/localization';
import { ContextData } from '@/context/LanguageContext';
import { useLocalStorage } from '@/hooks';

const LanguageContext = createContext<ContextData | undefined>(undefined);

const LanguageProvider: FC = ({ children }) => {
  const [selectedLanguage, setSelectedLanguage] = useLocalStorage('language', 'en');

  const translate = useCallback(
    (key: string): string => {
      return translations[selectedLanguage][key] ?? key;
    },
    [selectedLanguage]
  );

  const value = {
    selectedLanguage,
    setSelectedLanguage,
    t: translate,
  };

  console.log('LanguageProvider render');
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used inside a LanguageProvider');
  }
  return context;
};

export { LanguageProvider, useLanguage };
