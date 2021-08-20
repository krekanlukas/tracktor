import { lazy, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Redirect, Route, Switch } from 'react-router-dom';

import { ErrorBoundaryFallback, LoadingFallback } from '@/components/Common';
import { ROUTES } from '@/config/constants/routes';

// const DashboardPage = lazy(() => import('@/components/Dashboard'));
const TimerPage = lazy(() => import('@/components/Timer'));
const ReportsPage = lazy(() => import('@/components/Reports'));
const ProjectsPage = lazy(() => import('@/components/Projects'));
const ProfilePage = lazy(() => import('@/components/Profile'));

export const ProtectedRoutes = () => {
  return (
    <ErrorBoundary FallbackComponent={ErrorBoundaryFallback}>
      <Suspense fallback={<LoadingFallback />}>
        <Switch>
          <Route exact path={ROUTES.HOME}>
            <Redirect to={ROUTES.TIMER} />
          </Route>
          <Route path={ROUTES.TIMER} component={TimerPage} />
          <Route path={ROUTES.REPORTS} component={ReportsPage} />
          <Route path={ROUTES.PROJECTS} component={ProjectsPage} />
          <Route path={ROUTES.PROFILE_SETTINGS} component={ProfilePage} />
          <Route component={TimerPage} />
        </Switch>
      </Suspense>
    </ErrorBoundary>
  );
};
