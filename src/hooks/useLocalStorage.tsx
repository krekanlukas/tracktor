import { useState, useEffect, Dispatch, SetStateAction } from 'react';

import localStorageHelper from '@/utils/localStorage';

// So far only for strings
export const useLocalStorage = (
  key: string,
  initalValue: string
): [string, Dispatch<SetStateAction<string>>] => {
  const [value, setValue] = useState<string>(() => {
    return localStorageHelper.get(key) ?? initalValue;
  });

  useEffect(() => {
    localStorageHelper.set(key, value);
    console.log('useLocalStorage commit');
  }, [key, value]);

  console.log('useLocalStorage render');
  return [value, setValue];
};
