import { createContext, Dispatch, FC, SetStateAction, useCallback, useContext } from 'react';

import { translations } from '@/config/localization';
import { useLocalStorage } from '@/hooks/useLocalStorage';

type ContextData = {
  selectedLanguage: string;
  setSelectedLanguage: Dispatch<SetStateAction<string>>;
  t: (key: string) => string;
};

const LanguageContext = createContext<ContextData | undefined>(undefined);

const LanguageProvider: FC = ({ children }) => {
  const [selectedLanguage, setSelectedLanguage] = useLocalStorage('language', 'en');

  const translate = useCallback(
    (key: string): string => {
      return translations[selectedLanguage][key] ?? key;
    },
    [selectedLanguage]
  );

  console.log('LanguageProvider render');
  return (
    <LanguageContext.Provider value={{ selectedLanguage, setSelectedLanguage, t: translate }}>
      {children}
    </LanguageContext.Provider>
  );
};

const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used inside a LanguageProvider');
  }
  return context;
};

export { LanguageProvider, useLanguage };
