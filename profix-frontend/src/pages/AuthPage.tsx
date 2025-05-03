// AuthPage.tsx
import { useLocation } from "wouter";

import { Box, Container, Paper, Typography } from "@mui/material";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import useAuth from "../hooks/useAuth";
import { useEffect } from "react";

const AuthPage = () => {
  const { isAuthenticated } = useAuth();
  const [location, setLocation] = useLocation();
  const isLogin = location === "/login";

  useEffect(() => {
    if (isAuthenticated) {
      setLocation("/");
    }
  }, [isAuthenticated, setLocation]);

  return (
    <Container maxWidth="md" sx={{ py: 10 }}>
      <Paper elevation={3} sx={{ overflow: "hidden", borderRadius: 2 }}>
        <Box
          sx={{
            bgcolor: "primary.main",
            color: "white",
            py: 4,
            px: 6,
            textAlign: "center",
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            fontWeight="bold"
            gutterBottom
          >
            {isLogin ? "Inicia Sesión en ProFix" : "Crear cuenta de Profix"}
          </Typography>
          <Typography variant="body1">
            Conecta y agenda citas con proveedores de servicios profesionales
          </Typography>
        </Box>
        <Box sx={{ p: 4 }}>{isLogin ? <LoginForm /> : <RegisterForm />}</Box>
      </Paper>
    </Container>
  );
};

export default AuthPage;
