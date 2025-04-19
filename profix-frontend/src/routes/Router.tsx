import { Route, Switch } from "wouter";
import useAuth from "../hooks/useAuth";
import { Navigate } from "./Navigate";
import HomePage from "../pages/HomePage";
import SearchPage from "../pages/SearchPage";
import ProviderProfile from "../pages/ProviderProfile";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import About from "../pages/About";
import ProviderLogin from "../pages/ProviderLogin";

export const ProtectedRoute = ({
  component: Component,
  ...rest
}: {
  component: React.ComponentType<any>;
  path: string;
}) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return isAuthenticated ? <Component {...rest} /> : <Navigate to="/login" />;
};

export const Router = () => {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/search" component={SearchPage} />
      <Route path="/about" component={About} />
      <Route path="provider-login" component={ProviderLogin} />
      <Route path="/providers/:id">
        {(params) => <ProviderProfile id={Number(params.id)} />}
      </Route>
      <Route path="/login" component={Login} />
      <Route component={NotFound} />
    </Switch>
  );
};

export default Router;
