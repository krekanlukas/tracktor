import { useState } from 'react';

export const useDisclosure = (initialState = false) => {
  const [isOpen, setIsOpen] = useState(initialState);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  const toggle = () => setIsOpen((previousValue) => !previousValue);

  console.log('useDisclosure render');
  return { isOpen, open, close, toggle };
};
