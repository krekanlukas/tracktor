import { Heading } from '@chakra-ui/react';
import { Route, Switch } from 'react-router-dom';

export const PublicRoutes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Landing} />
      <Route exact path="/login" component={Login} />
      <Route component={Landing} />
    </Switch>
  );
};

function Landing() {
  return <Heading>Landing page</Heading>;
}

function Login() {
  return <Heading>Login</Heading>;
}
