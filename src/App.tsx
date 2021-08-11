import { AppLayout, LandingPageLayout } from '@/components/Layout';
import { ProtectedRoutes, PublicRoutes } from '@/components/Routes';
function App() {
  const authenticated = false;

  console.log('App render');
  return authenticated ? (
    <AppLayout>
      <ProtectedRoutes />
    </AppLayout>
  ) : (
    <LandingPageLayout>
      <PublicRoutes />
    </LandingPageLayout>
  );
}

export default App;
