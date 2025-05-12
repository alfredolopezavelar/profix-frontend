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
import { mockCategories } from "../dev-data/data";
import useAuth from "../hooks/useAuth";
import { uploadImage } from "../services/handleImages";

interface FormState {
  category: string;
  description: string;
  hourlyRate: string;
  phoneNumber: string;
  city: string;
  coverPhoto: File | null;
}

const INITIAL_STATE: FormState = {
  category: "",
  description: "",
  hourlyRate: "",
  phoneNumber: "",
  city: "",
  coverPhoto: null,
};

const isLoading = false;

const ProviderLogin = () => {
  const { user, isAuthenticated } = useAuth();
  const [, setLocation] = useLocation();

  //const { registerProvider, isLoading, error } = useProvider();

  const [form, setForm] = useState<FormState>(INITIAL_STATE);
  const [preview, setPreview] = useState<string | null>(null);
  const [errMsg, setErrMsg] = useState("");

  const handleChange =
    (field: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm({ ...form, [field]: e.target.value });

  // CAMBIAR ESTO A FUNCIÓN HECHA POR LAMBDA
  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setForm({ ...form, coverPhoto: file });
    if (file) setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrMsg("");

    if (!form.category || !form.hourlyRate || !form.phoneNumber || !form.city) {
      setErrMsg("Completa todos los campos obligatorios.");
      return;
    }

    let coverPhotoURL: string;
    // obtener link de nueva imagen
    if (form.coverPhoto) {
      try {
        coverPhotoURL = await uploadImage(form.coverPhoto);
      } catch (err) {
        alert("Error al subir imagen");
      }
    }

    try {
      // CHANGE THIS FOR THE IMAGE UPLOADED TO THE BUCKET
      // await registerProvider(form);
      setLocation("/");
    } catch (err: any) {
      setErrMsg(err?.message || "Error al registrar proveedor.");
    }
  };

  if (!isAuthenticated || !user) {
    console.log("User must be authenticated as a provider");
    setLocation("/login");
  }

  return (
    <>
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
            <Grid size={12}>
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

            <Grid size={12}>
              <TextField
                label="Descripción breve"
                multiline
                rows={3}
                fullWidth
                value={form.description}
                onChange={handleChange("description")}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 4 }}>
              <TextField
                label="Tarifa por hora (MXN)*"
                type="number"
                fullWidth
                value={form.hourlyRate}
                onChange={handleChange("hourlyRate")}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 4 }}>
              <TextField
                label="Teléfono*"
                fullWidth
                value={form.phoneNumber}
                onChange={handleChange("phoneNumber")}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 4 }}>
              <TextField
                label="Ciudad*"
                fullWidth
                value={form.city}
                onChange={handleChange("city")}
              />
            </Grid>

            <Grid size={12}>
              <Button
                component="label"
                variant="outlined"
                color="info"
                startIcon={<PhotoCamera />}
              >
                {form.coverPhoto ? "Cambiar portada" : "Subir foto de portada"}
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handlePhoto}
                />
              </Button>
              {preview && (
                <Box
                  mt={2}
                  component="img"
                  src={preview}
                  alt="preview"
                  sx={{
                    width: "100%",
                    maxHeight: 240,
                    objectFit: "cover",
                    borderRadius: 2,
                  }}
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
    </>
  );
};

export default ProviderLogin;
