import { AppLayout, LandingPageLayout } from '@/components/Layout';
import { ProtectedRoutes, PublicRoutes } from '@/components/Routes';
import { useAuth } from '@/context/AuthContext';

function App() {
  const { user } = useAuth();

  console.log('App render', user);

  if (user === undefined) return <div>Loading....</div>;

  return user ? (
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
