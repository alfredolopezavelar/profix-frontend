import { Route, Switch } from "wouter";
import useAuth from "../hooks/useAuth";
import { Navigate } from "./Navigate";
import HomePage from "../pages/HomePage";
import SearchPage from "../pages/SearchPage";
import ProviderProfile from "../pages/ProviderProfile";
import NotFound from "../pages/NotFound";
import About from "../pages/About";
import ProviderLogin from "../pages/ProviderLogin";
import MyProfile from "../pages/MyProfile";
import AuthPage from "../pages/AuthPage";
import EditProvider from "../pages/EditProvider";

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
        {(params) => <ProviderProfile id={params.id} />}
      </Route>
      <Route path="my-profile" component={MyProfile}></Route>
      <Route path="edit-provider" component={EditProvider}></Route>
      <Route path="/login" component={AuthPage}></Route>
      <Route path="/register" component={AuthPage}></Route>
      <Route component={NotFound} />
    </Switch>
  );
};

export default Router;
