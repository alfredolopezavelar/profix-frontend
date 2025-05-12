import { Route, Switch } from "wouter";
import useAuth from "../hooks/useAuth";
import { Navigate } from "./Navigate";
import HomePage          from "../pages/HomePage";
import SearchPage        from "../pages/SearchPage";
import ProviderProfile   from "../pages/ProviderProfile";
import About             from "../pages/About";
import ProviderLogin     from "../pages/ProviderLogin";     // ← edición perfil
import ProviderDashboard from "../pages/ProviderDashboard"; // ← resumen proveedor
import MyProfile         from "../pages/MyProfile";
import AuthPage          from "../pages/AuthPage";

export const ProtectedRoute = ({
  component: Component,
  ...rest
}: {
  component: React.ComponentType<any>;
  path: string;
}) => {
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading) return <div>Loading...</div>;
  return isAuthenticated ? <Component {...rest} /> : <Navigate to="/login" />;
};

export const Router = () => (
  <Switch>
    <Route path="/" component={HomePage} />
    <Route path="/search" component={SearchPage} />
    <Route path="/about" component={About} />

    {/* Perfil público del proveedor */}
    <Route path="/providers/:id">
      {(params) => <ProviderProfile id={params.id} />}
    </Route>

    {/* Rutas protegidas */}
    <ProtectedRoute path="/edit-provider"       component={ProviderLogin} />
    <ProtectedRoute path="/provider-dashboard" component={ProviderDashboard} />
    <ProtectedRoute path="/my-profile"         component={MyProfile} />

    {/* Auth */}
    <Route path="/login"    component={AuthPage} />
    <Route path="/register" component={AuthPage} />

    <Route component={About /* NotFound or fallback */} />
  </Switch>
);

export default Router;
