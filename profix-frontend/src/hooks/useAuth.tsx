import {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import { IUser, IAuthState } from "../types";
import apiClient from "../services/api-client";

interface AuthContextType extends IAuthState {
  login: (user: string, password: string) => Promise<void>;
  logout: () => void;
}

const defaultAuthState: IAuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

const AuthContext = createContext<AuthContextType>({
  ...defaultAuthState,
  login: async () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthState] = useState<IAuthState>(defaultAuthState);

  useEffect(() => {
    const checkAuthStatus = () => {
      const storedUser = localStorage.getItem("profix_user");

      if (storedUser) {
        try {
          const user = JSON.parse(storedUser) as IUser;
          setAuthState({
            user,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
        } catch (err) {
          console.error("Failed to parse stored user data", err);
          localStorage.removeItem("profix_user");
          setAuthState({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,
          });
        }
      } else {
        setAuthState((prev) => ({ ...prev, isLoading: false }));
      }
    };

    checkAuthStatus();
  }, []);

  // Implement this function when backend finished
  const login = async (username: string, password: string) => {
    setAuthState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      const res = await apiClient.post("/user/login", {
        username: username,
        password: password,
      });

      const { token, userToReturn } = res.data;

      localStorage.setItem("profix_token", token);
      localStorage.setItem("profix_user", JSON.stringify(userToReturn));

      setAuthState({
        user: userToReturn,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    } catch (err: any) {
      const message =
        err.response?.data?.message || err.message || "Error al iniciar sesión";
      console.error(err);
      console.error(message);
      setAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: message,
      });
    }
  };

  const logout = () => {
    localStorage.removeItem("profix_user");
    localStorage.removeItem("profix_token");
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default useAuth;
