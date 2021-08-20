import { useState, useCallback } from 'react';

export const useDisclosure = (initialState = false) => {
  const [isOpen, setIsOpen] = useState(initialState);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((previousValue) => !previousValue), []);

  console.log('useDisclosure render');
  return { isOpen, open, close, toggle };
};
