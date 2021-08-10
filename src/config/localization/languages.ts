type Language = {
  locale: string;
  language: string;
  code: string;
};

export const EN: Language = {
  locale: 'en-US',
  language: 'English',
  code: 'en',
};

export const SK: Language = {
  locale: 'sk-SK',
  language: 'Slovensky',
  code: 'sk',
};

export const languages = {
  en: EN,
  sk: SK,
};

export const languagesList = Object.values(languages);
