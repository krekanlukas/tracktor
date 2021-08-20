import { Button, ListItem } from '@chakra-ui/react';
import { FC, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { NavigationItemType } from '@/components/Layout/Navigation';
import { getFormattedDistance } from '@/components/Timer';
import { ROUTES } from '@/config/constants/routes';
import { useLanguage } from '@/context/LanguageContext';

type NavigationItemProps = {
  navigationItem: NavigationItemType;
  start: Date | undefined;
  isLoading: boolean;
};

export const NavigationItem: FC<NavigationItemProps> = ({ navigationItem, start, isLoading }) => {
  const { t } = useLanguage();
  const { pathname } = useLocation();
  const [time, setTime] = useState<string>('0:00:00');

  useEffect(() => {
    const intervalId =
      start &&
      navigationItem.to === ROUTES.TIMER &&
      setInterval(() => {
        setTime(getFormattedDistance(new Date(start)));
      }, 1000);
    console.log('NavigationItem commit');
    return () => {
      if (intervalId) clearInterval(intervalId);
      setTime('0:00:00');
      console.log('NavigationItem unmount commit');
    };
  }, [navigationItem.to, start]);

  // console.log('NavigationItem render');
  return (
    <ListItem>
      <Link to={navigationItem.to}>
        <Button
          leftIcon={navigationItem.icon}
          isFullWidth
          justifyContent={navigationItem.to === ROUTES.TIMER && isLoading ? 'center' : 'flex-start'}
          variant={pathname === navigationItem.to ? 'solid' : 'outline'}
          colorScheme={pathname === navigationItem.to ? 'teal' : 'gray'}
          isLoading={navigationItem.to === ROUTES.TIMER && isLoading}
        >
          {navigationItem.to === ROUTES.TIMER && start ? time : t(navigationItem.name)}
        </Button>
      </Link>
    </ListItem>
  );
};
