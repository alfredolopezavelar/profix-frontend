import { useLocation } from "wouter";
import useAuth from "../hooks/useAuth";
import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const Login = () => {
  const { login, isAuthenticated, isLoading, error } = useAuth();
  const [, setLocation] = useLocation();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [showPass, setShowPass] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      setLocation("/");
    }
  }, [isAuthenticated]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(username, password);
    } catch (error: any) {
      // show message from server
      setPassword("");
    }
  };

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
            Inicia Sesión en ProFix
          </Typography>
          <Typography variant="body1">
            Conecta y agenda citas con proveedores de servicios profesionales
          </Typography>
        </Box>

        <Box sx={{ p: 4 }}>
          <Box component="form" onSubmit={handleSubmit}>
            {error && (
              <Typography color="error" variant="body2" sx={{ mb: 2 }}>
                {error}
              </Typography>
            )}

            <TextField
              fullWidth
              label="Usuario"
              type="text"
              margin="normal"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />

            <TextField
              fullWidth
              label="Password"
              type={showPass ? "text" : "password"}
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPass(!showPass)}
                      edge="end"
                    >
                      {showPass ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="info"
              size="large"
              disabled={isLoading}
              sx={{ py: 1.5 }}
            >
              {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
            </Button>
          </Box>

          <Typography variant="body2" align="center" sx={{ mt: 4 }}>
            No tienes cuenta?{" "}
            <Button
              color="info"
              sx={{
                textTransform: "none",
                fontWeight: "medium",
                p: 0,
                ml: 0.5,
              }}
            >
              Crear cuenta
            </Button>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
