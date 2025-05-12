import { useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  InputAdornment,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { useLocation } from "wouter";

import useAuth from "../hooks/useAuth";
import useProvider from "../hooks/useProvider";
import { mockCategories } from "../dev-data/data";

import LoginForm from "../components/LoginForm"; // tu formulario ya existente

const ProviderLogin = () => {
  const { isAuthenticated, user } = useAuth();
  const { updateProvider, isLoading } = useProvider();
  const [, navigate] = useLocation();

  /* ---------- Hooks ---------- */
  const [form, setForm] = useState({
    businessName: "",
    category: "",
    description: "",
    hourlyRate: "",
    phoneNumber: "",
    city: "",
    coverPhoto: null as File | null,
  });
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState("");

  /* ---------- manejo de ramificaciones ---------- */
  if (!isAuthenticated) {
    // 👉 Usuario sin sesión: muestra LoginForm dentro de esta página
    return (
      <Container maxWidth="sm" sx={{ py: 8 }}>
        <LoginForm />
      </Container>
    );
  }

  if (user && user.isProvider) {
    // 👉 Ya es proveedor: llévalo a editar perfil (o dashboard)
    navigate("/edit-provider");
    return null;
  }

  /* ---------- Formulario para crear perfil de proveedor ---------- */

  const handle =
    (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm({ ...form, [k]: e.target.value });

  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setForm({ ...form, coverPhoto: file });
    if (file) setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!form.businessName || !form.category || !form.hourlyRate) {
      setError("Completa los campos marcados con *");
      return;
    }

    // construye FormData si vas a subir imagen
    await updateProvider(form); // TODO: sustituir con tu endpoint real
    navigate(`/providers/${user._id}`);
  };

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Typography variant="h4" fontWeight="bold" color="primary" gutterBottom>
        Crea tu perfil de proveedor
      </Typography>

      <Box component="form" onSubmit={handleSubmit}>
        {error && (
          <Typography color="error" variant="body2" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Nombre del negocio*"
              fullWidth
              value={form.businessName}
              onChange={handle("businessName")}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Categoría*"
              select
              fullWidth
              value={form.category}
              onChange={handle("category")}
            >
              {mockCategories.map((c) => (
                <MenuItem key={c.id} value={c.name}>
                  {c.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Descripción"
              multiline
              rows={4}
              fullWidth
              value={form.description}
              onChange={handle("description")}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              label="Tarifa / hr (MXN)*"
              type="number"
              fullWidth
              value={form.hourlyRate}
              onChange={handle("hourlyRate")}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              label="Teléfono*"
              fullWidth
              value={form.phoneNumber}
              onChange={handle("phoneNumber")}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              label="Ciudad*"
              fullWidth
              value={form.city}
              onChange={handle("city")}
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              component="label"
              variant="outlined"
              color="info"
              startIcon={<PhotoCamera />}
            >
              {form.coverPhoto ? "Cambiar portada" : "Subir portada"}
              <input type="file" hidden accept="image/*" onChange={handlePhoto} />
            </Button>

            {preview && (
              <Box
                mt={2}
                component="img"
                src={preview}
                alt="Portada"
                sx={{ width: "100%", maxHeight: 240, borderRadius: 1 }}
              />
            )}
          </Grid>
        </Grid>

        <Button
          type="submit"
          variant="contained"
          color="info"
          size="large"
          fullWidth
          sx={{ mt: 4 }}
          disabled={isLoading}
        >
          {isLoading ? "Guardando..." : "Crear perfil"}
        </Button>
      </Box>
    </Container>
  );
};

export default ProviderLogin;
