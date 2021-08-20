const localStoragePrefix = 'tracktor_';

const localStorageHelper = {
  get: (key: string) => {
    try {
      return JSON.parse(window.localStorage.getItem(`${localStoragePrefix}${key}`) as string);
    } catch {
      return null;
    }
  },
  set: (key: string, value: string) => {
    window.localStorage.setItem(`${localStoragePrefix}${key}`, JSON.stringify(value));
  },
  clear: (key: string) => {
    window.localStorage.removeItem(`${localStoragePrefix}${key}`);
  },
};

export default localStorageHelper;
