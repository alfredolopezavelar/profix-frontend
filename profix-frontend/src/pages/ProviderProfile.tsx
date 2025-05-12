import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Rating,
  Skeleton,
  TextField,
  Typography,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LocalPhoneRoundedIcon from "@mui/icons-material/LocalPhoneRounded";
import StarIcon from "@mui/icons-material/Star";
import { Link } from "wouter";

import useAuth from "../hooks/useAuth";
import useProvider from "../hooks/useProvider";
import { mockProviders, mockReviews } from "../dev-data/data";

import AlertDialog from "../components/ui/AlertDialog";
import SkeletonProfile from "../components/ui/SkeletonProfile";
import JobCard from "../components/JobCard";
import ReviewCard from "../components/ReviewCard";
import Calendar from "../components/Calendar";
import AddJobForm from "../components/AddJobForm";

interface Props {
  id: string; // viene de /providers/:id
}

const EMPTY_DIALOG = { title: "", message: "", open: false };

const ProviderProfile = ({ id }: Props) => {
  const { isAuthenticated, user } = useAuth();
  const { addJobToProvider } = useProvider();

  /* ----------------- estados ----------------- */
  const [dialogData, setDialogData] = useState(EMPTY_DIALOG);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [message, setMessage] = useState("");
  const [openJob, setOpenJob] = useState(false);

  /* ---------- datos (reemplaza mocks) -------- */
  const [provider, setProvider] = useState(mockProviders[0]);
  const [reviews] = useState(mockReviews);

  const isLoadingReviews = false;
  const isLoadingAppointment = false;
  const testBool = false; // skeleton demo

  /* --------- ¿es mi perfil? --------- */
  const isOwner =
    isAuthenticated && user?.isProvider && user?._id === provider._id;

  /* --------- handlers --------- */
  const handleDateTimeSelected = (date: Date, time: string) => {
    setSelectedDate(date);
    setSelectedTime(time);
  };

  const handleBookAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      setDialogData({
        ...dialogData,
        title: "Inicia sesión",
        message: "Necesitas una cuenta para agendar citas.",
        open: true,
      });
      return;
    }
    if (!selectedDate || !selectedTime) {
      setDialogData({
        ...dialogData,
        title: "Faltan datos",
        message: "Selecciona fecha y hora.",
        open: true,
      });
    }
  };

  const handleSaveJob = async (data: {
    title: string;
    description: string;
    image: File;
  }) => {
    // En producción haz POST /providers/:id/jobs
    const newJob = await addJobToProvider(provider._id, data);

    // Actualiza UI local
    setProvider((prev: any) => ({
      ...prev,
      providerData: {
        ...prev.providerData,
        jobs: [newJob, ...prev.providerData.jobs],
      },
    }));
    setOpenJob(false);
  };

  /* --------- loading skeleton demo --------- */
  if (testBool) return <SkeletonProfile />;

  /* ========== UI ========= */
  return (
    <>
      <Container maxWidth="xl" sx={{ py: 6 }}>
        {/* HEADER con foto de portada */}
        <Box
          sx={{
            bgcolor: "white",
            borderRadius: 2,
            overflow: "hidden",
            boxShadow: 1,
          }}
        >
          <Box
            sx={{
              position: "relative",
              p: 4,
              bgcolor: provider.providerData?.coverPhotoURL
                ? "transparent"
                : "rgba(0,51,102,0.1)",
              backgroundImage: provider.providerData?.coverPhotoURL
                ? `url(${provider.providerData.coverPhotoURL})`
                : "none",
              backgroundSize: "cover",
              backgroundPosition: "center",
              minHeight: 250,
              display: "flex",
              alignItems: "center",
            }}
          >
            <Box
              sx={{ position: "absolute", inset: 0, bgcolor: "rgba(0,0,0,0.4)" }}
            />
            <Box sx={{ position: "relative", zIndex: 1, width: "100%" }}>
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

                {/* info */}
                <Grid item xs={12} md={9}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: { xs: "column", md: "row" },
                      justifyContent: "space-between",
                    }}
                  >
                    <Box>
                      <Typography variant="h4" fontWeight="bold" color="#90caf9">
                        {provider.name}
                      </Typography>
                      <Typography variant="h6" color="common.white">
                        {provider.providerData.categoryName}
                      </Typography>
                      <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                        <Rating
                          value={provider.providerData.averageRating}
                          readOnly
                          precision={0.5}
                          emptyIcon={
                            <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                          }
                        />
                        <Typography variant="h5" color="#90caf9" sx={{ ml: 1 }}>
                          {provider.providerData.averageRating.toFixed(1)}
                        </Typography>
                      </Box>
                    </Box>

                    <Box sx={{ mt: { xs: 2, md: 0 } }}>
                      <Card sx={{ mb: 2, boxShadow: 1 }}>
                        <CardContent sx={{ py: 1, textAlign: "center" }}>
                          <Typography variant="body2">Costo por hora</Typography>
                          <Typography variant="h5" color="primary" fontWeight="bold">
                            ${provider.providerData.hourlyRate}/hr
                          </Typography>
                        </CardContent>
                      </Card>
                      <Button
                        variant="contained"
                        color="info"
                        fullWidth
                        onClick={() =>
                          document
                            .getElementById("book-appointment")
                            ?.scrollIntoView({ behavior: "smooth" })
                        }
                      >
                        Agenda una cita
                      </Button>
                    </Box>
                  </Box>

                  {/* datos rápidos */}
                  <Grid
                    container
                    spacing={3}
                    sx={{
                      mt: 1,
                      bgcolor: "rgba(255,255,255,0.7)",
                      borderRadius: 2,
                      p: 2,
                    }}
                  >
                    <Grid item xs={12} sm={4}>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <LocationOnIcon sx={{ mr: 1 }} fontSize="small" />
                        <Typography variant="body2">
                          {provider.providerData.location}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <LocalPhoneRoundedIcon sx={{ mr: 1 }} fontSize="small" />
                        <Typography variant="body2">
                          {provider.providerData.phoneNumber}
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </Box>

          {/* -------- CONTENIDO -------- */}
          <Box sx={{ p: 4 }}>
            <Grid container spacing={4}>
              {/* Columna principal */}
              <Grid item lg={8} xl={12}>
                {/* Acerca de */}
                <Box sx={{ mb: 6 }}>
                  <Typography variant="h3" fontWeight="bold" color="primary">
                    Acerca de
                  </Typography>
                  <Typography>{provider.providerData.description}</Typography>
                </Box>

                {/* Trabajos */}
                <Box sx={{ mb: 6, display: "flex", flexDirection: "column" }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mb: 2,
                    }}
                  >
                    <Typography variant="h4" fontWeight="bold" color="primary">
                      Trabajos
                    </Typography>
                    {isOwner && (
                      <Button variant="outlined" onClick={() => setOpenJob(true)}>
                        + Nuevo trabajo
                      </Button>
                    )}
                  </Box>

                  <Grid
                    container
                    spacing={2}
                    sx={{ maxHeight: 500, overflowY: "auto" }}
                  >
                    {provider.providerData?.jobs?.map((job, i) => (
                      <Grid item xs={6} md={4} key={i}>
                        <JobCard job={job} />
                      </Grid>
                    ))}
                  </Grid>

                  {/* Modal */}
                  {isOwner && (
                    <AddJobForm
                      open={openJob}
                      onClose={() => setOpenJob(false)}
                      onSave={handleSaveJob}
                    />
                  )}
                </Box>

                {/* Reseñas */}
                <Box>
                  <Typography variant="h4" fontWeight="bold" color="primary">
                    Reseñas
                  </Typography>
                  {isLoadingReviews ? (
                    [1, 2, 3].map((k) => (
                      <Skeleton
                        key={k}
                        variant="rectangular"
                        height={100}
                        sx={{ mb: 2, borderRadius: 1 }}
                      />
                    ))
                  ) : reviews.length === 0 ? (
                    <Typography sx={{ py: 4, textAlign: "center" }}>
                      Sin reseñas todavía
                    </Typography>
                  ) : (
                    <Box sx={{ maxHeight: 300, overflowY: "auto" }}>
                      {reviews.map((r, i) => (
                        <ReviewCard key={i} review={r} />
                      ))}
                    </Box>
                  )}
                </Box>
              </Grid>

              {/* Columna de reserva */}
              <Grid item xs={12}>
                <Box
                  sx={{
                    bgcolor: "rgba(0,0,0,0.02)",
                    borderRadius: 2,
                    p: 3,
                  }}
                >
                  <Typography variant="h5" fontWeight="bold" color="primary">
                    Reserva una cita
                  </Typography>

                  <Calendar
                    providerId={id}
                    onDateTimeSelected={handleDateTimeSelected}
                  />

                  <Box
                    id="book-appointment"
                    component="form"
                    onSubmit={handleBookAppointment}
                  >
                    <TextField
                      fullWidth
                      label="Mensaje (opcional)"
                      multiline
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      margin="normal"
                    />
                    <Button
                      type="submit"
                      variant="contained"
                      color="info"
                      fullWidth
                      sx={{ mt: 3 }}
                      disabled={isLoadingAppointment}
                    >
                      Confirmar
                    </Button>
                    {!isAuthenticated && (
                      <Typography
                        variant="body2"
                        color="error"
                        align="center"
                        sx={{ mt: 1 }}
                      >
                        <Link to="/login">Inicia sesión</Link> para agendar
                      </Typography>
                    )}
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>

      {/* diálogos de alerta */}
      <AlertDialog {...dialogData} onClose={() => setDialogData(EMPTY_DIALOG)} />
    </>
  );
};

export default ProviderProfile;
