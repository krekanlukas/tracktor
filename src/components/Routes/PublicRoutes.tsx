import { Heading } from '@chakra-ui/react';
import { Route, Switch } from 'react-router-dom';

import { LandingPage } from '@/components/LandingPage';
import { ROUTES } from '@/config/constants/routes';

export const PublicRoutes = () => {
  return (
    <Switch>
      <Route exact path={ROUTES.HOME} component={LandingPage} />
      <Route exact path={ROUTES.LOGIN} component={Login} />
      <Route exact path={ROUTES.REGISTER} component={Register} />
      <Route component={LandingPage} />
    </Switch>
  );
};

function Login() {
  return <Heading>Login</Heading>;
}

function Register() {
  return <Heading>Register</Heading>;
}
