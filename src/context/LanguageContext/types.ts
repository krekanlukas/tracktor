import { Dispatch, SetStateAction } from 'react';

export type ContextData = {
  selectedLanguage: string;
  setSelectedLanguage: Dispatch<SetStateAction<string>>;
  t: (key: string) => string;
};
