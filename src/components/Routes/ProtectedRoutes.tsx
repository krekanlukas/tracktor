import { Heading } from '@chakra-ui/react';
import { Route, Switch } from 'react-router-dom';

import { ROUTES } from '@/config/constants/routes';

export const ProtectedRoutes = () => {
  return (
    <Switch>
      <Route exact path={ROUTES.HOME} component={Home} />
      <Route path={ROUTES.TIMER} component={Timer} />
      <Route path={ROUTES.REPORTS} component={Reports} />
      <Route path={ROUTES.PROJECTS} component={Projects} />
      <Route path={ROUTES.PROFILE_SETTINGS} component={Profile} />
      <Route component={Home} />
    </Switch>
  );
};

function Timer() {
  console.log('Timer render');
  return <Heading>Timer</Heading>;
}
function Reports() {
  console.log('Reports render');
  return <Heading>Reports</Heading>;
}
function Projects() {
  console.log('Projects render');
  return <Heading>Projects</Heading>;
}
function Profile() {
  console.log('Profile render');
  return <Heading>Profile</Heading>;
}
function Home() {
  console.log('Home render');
  return <Heading>Home</Heading>;
}
