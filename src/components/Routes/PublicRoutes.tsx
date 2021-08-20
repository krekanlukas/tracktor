import { Route, Switch } from 'react-router-dom';

import { Login, Registration } from '@/components/AuthForms';
import { LandingPage } from '@/components/LandingPage';
import { ROUTES } from '@/config/constants/routes';

export const PublicRoutes = () => {
  return (
    <Switch>
      <Route exact path={ROUTES.HOME} component={LandingPage} />
      <Route exact path={ROUTES.LOGIN} component={Login} />
      <Route exact path={ROUTES.REGISTER} component={Registration} />
      <Route component={LandingPage} />
    </Switch>
  );
};
