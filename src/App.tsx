import { AppLayout } from '@/components/Layout';
import { ProtectedRoutes, PublicRoutes } from '@/components/Routes';
function App() {
  const authenticated = true;
  const authLayout = (
    <AppLayout>
      <ProtectedRoutes />
    </AppLayout>
  );

  console.log('App render');
  return authenticated ? authLayout : <PublicRoutes />;
}

export default App;
