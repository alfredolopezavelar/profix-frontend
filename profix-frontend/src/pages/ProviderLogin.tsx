import { useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { useLocation } from "wouter";
import { mockCategories } from "../dev-data/data";
import useAuth from "../hooks/useAuth";
import useProvider from "../hooks/useProvider";

interface FormState {
  businessName: string;
  category: string;
  description: string;
  hourlyRate: string;
  phoneNumber: string;
  city: string;
  coverPhoto: File | null;
}

const INITIAL_STATE: FormState = {
  businessName: "",
  category: "",
  description: "",
  hourlyRate: "",
  phoneNumber: "",
  city: "",
  coverPhoto: null,
};

const ProviderLogin = () => {
  const { isAuthenticated } = useAuth();
  const { registerProvider, isLoading, error } = useProvider();
  const [, setLocation] = useLocation();

  const [form, setForm] = useState<FormState>(INITIAL_STATE);
  const [preview, setPreview] = useState<string | null>(null);
  const [errMsg, setErrMsg] = useState("");

  const handleChange =
    (field: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm({ ...form, [field]: e.target.value });

  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setForm({ ...form, coverPhoto: file });
    if (file) setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrMsg("");

    if (
      !form.businessName ||
      !form.category ||
      !form.hourlyRate ||
      !form.phoneNumber ||
      !form.city
    ) {
      setErrMsg("Completa todos los campos obligatorios.");
      return;
    }

    try {
      await registerProvider(form);
      setLocation("/");
    } catch (err: any) {
      setErrMsg(err?.message || "Error al registrar proveedor.");
    }
  };

  if (!isAuthenticated) {
    return (
      <Container maxWidth="sm" sx={{ py: 8, textAlign: "center" }}>
        <Typography variant="h5" gutterBottom>
          Necesitas iniciar sesión para convertirte en proveedor.
        </Typography>
        <Button variant="contained" color="info" onClick={() => setLocation("/login")}>
          Iniciar sesión
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Typography variant="h4" fontWeight="bold" color="primary" gutterBottom>
        Registra tu perfil de proveedor
      </Typography>

      <Box component="form" onSubmit={handleSubmit} noValidate>
        {errMsg && (
          <Typography color="error" variant="body2" sx={{ mb: 2 }}>
            {errMsg}
          </Typography>
        )}

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Nombre del negocio*"
              fullWidth
              value={form.businessName}
              onChange={handleChange("businessName")}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Categoría*"
              select
              fullWidth
              value={form.category}
              onChange={handleChange("category")}
            >
              {mockCategories.map((cat) => (
                <MenuItem key={cat.id} value={cat.name}>
                  {cat.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Descripción breve"
              multiline
              rows={3}
              fullWidth
              value={form.description}
              onChange={handleChange("description")}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              label="Tarifa por hora (MXN)*"
              type="number"
              fullWidth
              value={form.hourlyRate}
              onChange={handleChange("hourlyRate")}
              InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              label="Teléfono*"
              fullWidth
              value={form.phoneNumber}
              onChange={handleChange("phoneNumber")}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              label="Ciudad*"
              fullWidth
              value={form.city}
              onChange={handleChange("city")}
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              component="label"
              variant="outlined"
              color="info"
              startIcon={<PhotoCamera />}
            >
              {form.coverPhoto ? "Cambiar portada" : "Subir foto de portada"}
              <input type="file" hidden accept="image/*" onChange={handlePhoto} />
            </Button>
            {preview && (
              <Box
                mt={2}
                component="img"
                src={preview}
                alt="preview"
                sx={{ width: "100%", maxHeight: 240, objectFit: "cover", borderRadius: 2 }}
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
          sx={{ mt: 4, py: 1.5 }}
          disabled={isLoading}
        >
          {isLoading ? "Registrando..." : "Registrar proveedor"}
        </Button>
      </Box>
    </Container>
  );
};

export default ProviderLogin;
