import { useLocation } from "wouter";
import { useEffect, useState } from "react";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import useAuth from "../hooks/useAuth";

const RegisterForm = () => {
  const { register, error, isLoading } = useAuth();
  const [, setLocation] = useLocation();

  const [form, setForm] = useState({
    username: "",
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
  });

  const [showPass, setShowPass] = useState(false);
  const [err, setErr] = useState("");

  useEffect(() => {
    if (error) {
      setErr(error);
    }
  }, [error]);

  useEffect(() => {
    console.log(form);
  }, [form]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      setErr("Las contraseñas no coinciden");
      return;
    }

    setErr("");

    try {
      await register(form.username, form.password, form.email, form.name);
    } catch (err: any) {
      setErr(err?.response?.data?.message || "Error al registrar usuario");
    }
  };

  return (
    <>
      <Box component="form" onSubmit={handleSubmit}>
        {err && (
          <Typography color="error" variant="body2" sx={{ mb: 2 }}>
            {err}
          </Typography>
        )}

        <TextField
          fullWidth
          label="Usuario"
          name="username"
          margin="normal"
          value={form.username}
          onChange={handleChange}
          required
        />

        <TextField
          fullWidth
          label="Correo electrónico"
          name="email"
          margin="normal"
          value={form.email}
          onChange={handleChange}
          required
        />

        <TextField
          fullWidth
          label="Nombre completo"
          name="name"
          margin="normal"
          value={form.name}
          onChange={handleChange}
          required
        />

        <TextField
          fullWidth
          label="Contraseña"
          name="password"
          type={showPass ? "text" : "password"}
          margin="normal"
          value={form.password}
          onChange={handleChange}
          required
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPass(!showPass)} edge="end">
                  {showPass ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <TextField
          fullWidth
          label="Confirmar contraseña"
          name="confirmPassword"
          type={showPass ? "text" : "password"}
          margin="normal"
          value={form.confirmPassword}
          onChange={handleChange}
          required
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="info"
          size="large"
          sx={{ py: 1.5 }}
          disabled={isLoading}
        >
          Registrarse
        </Button>
      </Box>

      <Typography variant="body2" align="center" sx={{ mt: 4 }}>
        ¿Ya tienes cuenta?
        <Button
          color="info"
          sx={{
            textTransform: "none",
            fontWeight: "medium",
            p: 0,
            ml: 0.5,
          }}
          onClick={() => setLocation("/login")}
        >
          Iniciar sesión
        </Button>
      </Typography>
    </>
  );
};

export default RegisterForm;
