import { useState, useCallback } from 'react';

export const useBoolean = (initialState = false) => {
  const [value, setValue] = useState(initialState);

  const setTrue = useCallback(() => setValue(true), []);
  const setFalse = useCallback(() => setValue(false), []);
  const toggle = useCallback(() => setValue((previousValue) => !previousValue), []);

  console.log('useBoolean render');
  return [value, { setTrue, setFalse, toggle }] as const;
};
