import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  InputAdornment,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LocalPhoneRoundedIcon from "@mui/icons-material/LocalPhoneRounded";
import StarIcon from "@mui/icons-material/Star";
import { useLocation } from "wouter";

import useAuth from "../hooks/useAuth";
import { mockProviders, mockReviews } from "../dev-data/data";

import AddJobForm from "../components/AddJobForm";
import JobCard from "../components/JobCard";
import ReviewCard from "../components/ReviewCard";
import AlertDialog from "../components/ui/AlertDialog";
import SkeletonProfile from "../components/ui/SkeletonProfile";

/* ------------------------------------------------------------------ */
/* tipos y constantes */

interface FormState {
  name: string;
  category: string;
  description: string;
  hourlyRate: string;
  phoneNumber: string;
  location: string;
}

const EMPTY_DIALOG = { title: "", message: "", open: false };

/* ------------------------------------------------------------------ */

const EditProvider = () => {
  const { user, isAuthenticated } = useAuth();
  const { updateProvider, addJobToProvider, isLoading } = useProvider();
  const [, navigate] = useLocation();

  /* ➜ 1. redirige si no hay sesión */
  useEffect(() => {
    if (!isAuthenticated) navigate("/login");
  }, [isAuthenticated, navigate]);

  /* ➜ 2. carga datos (mock ahora, cámbialos por fetch real) */
  const initial = mockProviders[0];           // TODO: fetch /providers/me
  const [provider, setProvider] = useState(initial);
  const [reviews] = useState(mockReviews);    // TODO: fetch reviews

  /* ➜ 3. formulario editable */
  const [form, setForm] = useState<FormState>({
    name: provider.name,
    category: provider.providerData.categoryName,
    description: provider.providerData.description,
    hourlyRate: provider.providerData.hourlyRate.toString(),
    phoneNumber: provider.providerData.phoneNumber,
    location: provider.providerData.location,
  });

  const handle =
    (k: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm({ ...form, [k]: e.target.value });

  /* ➜ 4. estados de UI */
  const [dialog, setDialog] = useState(EMPTY_DIALOG);
  const [openJob, setOpenJob] = useState(false);

  /* ------------------------------------------------------------------ */
  /* guardado perfil */

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      /* TODO: reemplazar por llamada real a tu API */
      await updateProvider({ id: provider._id, ...form });

      /* actualiza estado local */
      setProvider((p) => ({
        ...p,
        name: form.name,
        providerData: {
          ...p.providerData,
          categoryName: form.category,
          description: form.description,
          hourlyRate: Number(form.hourlyRate),
          phoneNumber: form.phoneNumber,
          location: form.location,
        },
      }));

      setDialog({
        title: "Guardado",
        message: "Perfil actualizado correctamente",
        open: true,
      });
    } catch (err: any) {
      setDialog({
        title: "Error",
        message: err?.message || "No se pudo guardar",
        open: true,
      });
    }
  };

  /* ------------------------------------------------------------------ */
  /* agregar trabajo */

  const handleSaveJob = async (data: {
    title: string;
    description: string;
    image: File;
  }) => {
    /* TODO: POST /providers/:id/jobs */
    const newJob = await addJobToProvider(provider._id, data);

    setProvider((p) => ({
      ...p,
      providerData: { ...p.providerData, jobs: [newJob, ...p.providerData.jobs] },
    }));
    setOpenJob(false);
  };

  /* ------------------------------------------------------------------ */

  if (!isAuthenticated) return null;
  if (!provider) return <SkeletonProfile />;

  const { providerData } = provider;

  return (
    <>
      <Container maxWidth="xl" sx={{ py: 6 }}>
        {/* ----------------- ENCABEZADO ----------------- */}
        <form onSubmit={handleSaveProfile}>
          <Box sx={{ bgcolor: "white", borderRadius: 2, overflow: "hidden", boxShadow: 1 }}>
            {/* portada */}
            <Box
              sx={{
                position: "relative",
                p: 4,
                backgroundImage: providerData.coverPhotoURL
                  ? `url(${providerData.coverPhotoURL})`
                  : undefined,
                backgroundSize: "cover",
                backgroundPosition: "center",
                minHeight: 250,
                display: "flex",
                alignItems: "center",
              }}
            >
              <Grid container spacing={4}>
                {/* avatar */}
                <Grid item xs={12} md={3}>
                  <Box
                    sx={{
                      width: { xs: 100, md: 175 },
                      height: { xs: 100, md: 175 },
                      borderRadius: "50%",
                      overflow: "hidden",
                      border: "4px solid white",
                      boxShadow: 1,
                    }}
                  >
                    <img
                      src={provider.profilePhotoURL}
                      alt={provider.name}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </Box>
                </Grid>

                {/* campos editables */}
                <Grid item xs={12} md={9}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Nombre del proveedor"
                        value={form.name}
                        onChange={handle("name")}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Categoría"
                        value={form.category}
                        onChange={handle("category")}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        multiline
                        rows={3}
                        label="Descripción"
                        value={form.description}
                        onChange={handle("description")}
                      />
                    </Grid>

                    <Grid item xs={12} sm={4}>
                      <TextField
                        fullWidth
                        label="Tarifa por hora"
                        type="number"
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
                        fullWidth
                        label="Teléfono"
                        value={form.phoneNumber}
                        onChange={handle("phoneNumber")}
                      />
                    </Grid>

                    <Grid item xs={12} sm={4}>
                      <TextField
                        fullWidth
                        label="Ciudad"
                        value={form.location}
                        onChange={handle("location")}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Box>

            {/* barra inferior con botón guardar */}
            <Box sx={{ p: 4, textAlign: "right" }}>
              <Button type="submit" variant="contained" color="info" disabled={isLoading}>
                {isLoading ? "Guardando…" : "Guardar cambios"}
              </Button>
            </Box>
          </Box>
        </form>

        {/* ----------------- TRABAJOS ----------------- */}
        <Box sx={{ mt: 6 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
            <Typography variant="h4" fontWeight="bold">
              Trabajos realizados
            </Typography>
            <Button variant="outlined" onClick={() => setOpenJob(true)}>
              + Agregar trabajo
            </Button>
          </Box>

          <Grid container spacing={2}>
            {providerData.jobs.map((job, i) => (
              <Grid item xs={12} sm={6} md={4} key={i}>
                <JobCard job={job} />
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* ----------------- RESEÑAS (solo lectura) ----------------- */}
        <Box sx={{ mt: 6 }}>
          <Typography variant="h4" fontWeight="bold" mb={2}>
            Reseñas
          </Typography>
          <Grid container spacing={2}>
            {reviews.map((r, i) => (
              <Grid item xs={12} sm={6} md={4} key={i}>
                <ReviewCard review={r} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>

      {/* --------- MODAL NUEVO TRABAJO --------- */}
      <AddJobForm open={openJob} onClose={() => setOpenJob(false)} onSave={handleSaveJob} />

      {/* --------- DIÁLOGO --------- */}
      <AlertDialog {...dialog} onClose={() => setDialog(EMPTY_DIALOG)} />
    </>
  );
};

export default EditProvider;
