import { useState } from "react";
import useAuth from "../hooks/useAuth";
import { mockProviders, mockReviews } from "../dev-data/data";
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
import AlertDialog from "../components/ui/AlertDialog";
import SkeletonProfile from "../components/ui/SkeletonProfile";
import JobCard from "../components/JobCard";
import ReviewCard from "../components/ReviewCard";
import Calendar from "../components/Calendar";
import { Link } from "wouter";

// TODO

// AGREGAR FUNCIÓN PARA HACER FECTH AL BACKEND REVIEWS Y PROVEEDOR
// AGREGAR FUNCIÓN PARA CARGAR MÁS REVIEWS DE PRINCIPPIO SOLO 3

interface Props {
  id: string;
}

interface ProviderProfileProps {
  id: number;
}

const EMPTY_DIALOG = {
  title: "",
  message: "",
  btnMessage: undefined,
  open: false,
};

// DEVELOPMENT VARIABLES
const testBool = false;
const isLoadingAppintment = false;

const ProviderProfile = ({ id }: Props) => {
  const { isAuthenticated, user } = useAuth();

  // state for message
  const [dialogData, setDialogData] = useState(EMPTY_DIALOG);

  // states for appointmet booking
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [serviceType, setServiceType] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  // Fetch provider data
  // CRETE THIS FUNCTION

  const provider = mockProviders[0]; // REPLACE WITH FETCH FUNCTION

  // FETCH REVIEWS
  const isLoadingReviews = false;
  const reviews = mockReviews;

  const handleDateTimeSelected = (date: Date, time: string) => {
    setSelectedDate(date);
    setSelectedTime(time);
  };

  const handleBookAppointment = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAuthenticated) {
      setDialogData({
        ...dialogData,
        title: "Inicia Sesión!",
        message: "Debes de tener un cuenta en Profix para poder agendar citas",
        open: true,
      });
      return;
    }

    if (!selectedDate || !selectedTime || !serviceType) {
      setDialogData({
        ...dialogData,
        title: "Formulario incompleto",
        message: "Llena todos los campos para agendar una cita",
        open: true,
      });
      return;
    }
  };

  const testClick = () => {
    setDialogData({
      ...dialogData,
      open: true,
      title: "Example works",
      message: "Example of message working",
    });
  };

  if (testBool) {
    return <SkeletonProfile />;
  }
  return (
    <>
      <Container maxWidth="xl" sx={{ py: 6 }}>
        <Box
          sx={{
            bgcolor: "white",
            borderRadius: 2,
            overflow: "hidden",
            boxShadow: 1,
          }}
        >
          {/* PROVIDER HEADER */}
          <Box
            sx={{
              position: "relative",
              bgcolor: provider.providerData?.coverPhotoURL
                ? "transparent"
                : "rgba(0, 51, 102, 0.1)",
              p: 4,
              backgroundImage: provider.providerData?.coverPhotoURL
                ? `url(${provider.providerData.coverPhotoURL})`
                : "none",
              backgroundSize: "cover",
              backgroundPosition: "center",
              minHeight: 250,
              barderRadius: 2,
              display: "flex",
              alignItems: "center",
              overflow: "hidden",
            }}
          >
            {/* Overlay oscuro */}
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                bgcolor: "rgba(0, 0, 0, 0.4)", // ajusta opacidad
                zIndex: 0,
              }}
            />
            <Box
              sx={{
                position: "relative",
                zIndex: 1,
                width: "100%",
              }}
            >
              <Grid
                container
                spacing={4}
                columnSpacing={5}
                sx={{ paddingX: { xs: 0, md: "45px" } }}
              >
                <Grid size={{ xs: 12, md: 3 }}>
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
                      src={
                        provider.profilePhotoURL
                          ? provider.profilePhotoURL
                          : undefined
                      }
                      alt={`${provider.name} profile`}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </Box>
                </Grid>

                <Grid size={{ xs: 12, md: 9 }}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: { xs: "column", md: "row" },
                      justifyContent: "space-between",
                    }}
                  >
                    <Box>
                      <Typography
                        variant="h4"
                        component="h1"
                        fontWeight="bold"
                        color="#90caf9"
                        gutterBottom
                      >
                        {provider.name}
                      </Typography>
                      <Typography
                        variant="h6"
                        color="common.white"
                        gutterBottom
                      >
                        {provider.providerData!.categoryName}
                      </Typography>
                      <Box
                        sx={{ display: "flex", alignItems: "center", mb: 2 }}
                      >
                        <Rating
                          value={provider.providerData!.averageRating}
                          readOnly
                          precision={0.5}
                          emptyIcon={
                            <StarIcon
                              style={{ opacity: 0.55 }}
                              fontSize="inherit"
                            />
                          }
                        />
                        <Typography
                          variant="h5"
                          component="span"
                          sx={{ ml: 1 }}
                          color="#90caf9"
                        >
                          {provider.providerData!.averageRating.toFixed(1)}
                        </Typography>
                      </Box>
                    </Box>

                    <Box sx={{ mt: { xs: 2, md: 0 } }}>
                      <Card sx={{ maxWidth: 180, mb: 2, boxShadow: 1 }}>
                        <CardContent sx={{ py: 1, textAlign: "center" }}>
                          <Typography variant="body2" color="text.secondary">
                            Costo por hora
                          </Typography>
                          <Typography
                            variant="h5"
                            color="primary"
                            fontWeight="bold"
                          >
                            ${provider.providerData!.hourlyRate}/hr
                          </Typography>
                        </CardContent>
                      </Card>

                      <Button
                        variant="contained"
                        color="info"
                        fullWidth
                        onClick={() => {
                          document
                            .getElementById("book-appointment")
                            ?.scrollIntoView({
                              behavior: "smooth",
                              block: "start",
                            });
                        }}
                      >
                        Agenda una cita
                      </Button>
                    </Box>
                  </Box>

                  <Grid
                    container
                    spacing={3}
                    sx={{
                      mt: 1,
                      backgroundColor: "rgba(255, 255, 255, 0.7)",
                      borderRadius: 2,
                      p: 2,
                    }}
                  >
                    <Grid size={{ xs: 12, sm: 4 }}>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <LocationOnIcon
                          fontSize="small"
                          sx={{ color: "text.secondary", mr: 1 }}
                        />
                        <Typography variant="body2" color="text.secondary">
                          {provider.providerData!.location}
                        </Typography>
                      </Box>
                    </Grid>

                    <Grid size={{ xs: 12, sm: 4 }}>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <LocalPhoneRoundedIcon
                          fontSize="small"
                          sx={{ color: "text.secondary", mr: 1 }}
                        />
                        <Typography variant="body2" color="text.secondary">
                          {provider.providerData!.phoneNumber}
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </Box>

          {/* PROVIDER CONTENT */}
          <Box sx={{ p: 4 }}>
            <Grid container spacing={4}>
              <Grid size={{ xl: 12, lg: 8 }}>
                <Box sx={{ mb: 6 }}>
                  <Typography
                    variant="h3"
                    component="h2"
                    fontWeight="bold"
                    color="primary"
                    gutterBottom
                  >
                    Acerca de
                  </Typography>
                  <Typography variant="body1">
                    {provider.providerData!.description}
                  </Typography>
                </Box>

                {/* Job section*/}
                {provider.providerData &&
                  provider.providerData.jobs.length > 0 && (
                    <Box
                      sx={{ mb: 6, display: "flex", flexDirection: "column" }}
                    >
                      <Typography
                        variant="h4"
                        component="h2"
                        fontWeight="bold"
                        color="primary"
                        gutterBottom
                      >
                        Trabajos
                      </Typography>
                      <Grid
                        container
                        spacing={2}
                        justifyContent="center"
                        sx={{ maxHeight: 500, overflowY: "auto" }}
                      >
                        {provider.providerData.jobs.map((job, index) => (
                          <Grid size={{ xs: 6, md: 4 }} key={index}>
                            <JobCard job={job}></JobCard>
                          </Grid>
                        ))}
                      </Grid>
                    </Box>
                  )}

                {/* REVIEWS SECTION */}
                <Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mb: 3,
                    }}
                  >
                    <Typography
                      variant="h4"
                      component="h2"
                      fontWeight="bold"
                      color="primary"
                    >
                      Reseñas
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <StarIcon sx={{ color: "#007BFF", mr: 0.5 }} />
                      <Typography
                        variant="body1"
                        fontWeight="medium"
                        component="span"
                      >
                        {provider.providerData!.averageRating.toFixed(1)}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ ml: 0.5 }}
                      >
                        ({provider.providerData!.totalReviews} reviews)
                      </Typography>
                    </Box>
                  </Box>

                  {isLoadingReviews ? (
                    [1, 2, 3].map((item) => (
                      <Skeleton
                        key={item}
                        variant="rectangular"
                        height={100}
                        sx={{ mb: 2, borderRadius: 1 }}
                      />
                    ))
                  ) : reviews.length === 0 ? (
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ py: 4, textAlign: "center" }}
                    >
                      Sin reseñas todavía
                    </Typography>
                  ) : (
                    <Box>
                      <Box sx={{ maxHeight: 300, overflowY: "auto" }}>
                        {reviews.map((review, index) => (
                          <ReviewCard key={index} review={review} />
                        ))}
                      </Box>
                    </Box>
                  )}
                </Box>
              </Grid>

              {/* Booking column */}
              <Grid size={12}>
                <Box
                  sx={{
                    bgcolor: "rgba(0, 0, 0, 0.02)",
                    borderRadius: 2,
                    p: 3,
                    position: "sticky",
                    top: 16,
                  }}
                >
                  <Typography
                    variant="h5"
                    component="h2"
                    fontWeight="bold"
                    color="primary"
                    gutterBottom
                  >
                    Book an Appointment
                  </Typography>
                  <Calendar
                    providerId={id}
                    onDateTimeSelected={handleDateTimeSelected}
                  ></Calendar>

                  {/* Booking form */}
                  <Box component="form" onSubmit={handleBookAppointment}>
                    <TextField
                      fullWidth
                      label="Message (Optional)"
                      placeholder="Describe your service needs"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      margin="normal"
                      multiline
                      rows={3}
                    />
                    <Button
                      type="submit"
                      variant="contained"
                      color="info"
                      fullWidth
                      size="large"
                      sx={{ mt: 3, py: 1.5, fontWeight: "medium" }}
                      disabled={
                        !selectedDate ||
                        !selectedTime ||
                        !serviceType ||
                        isLoadingAppintment
                      }
                    >
                      {isLoadingAppintment ? "Booking..." : "Confirm Booking"}
                    </Button>
                    {!isAuthenticated && (
                      <Typography
                        variant="body2"
                        color="error"
                        align="center"
                        sx={{ mt: 1 }}
                      >
                        <Link to="/login">Inicia Sesión</Link> para agendar una cita
                      </Typography>
                    )}
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>

      <Button variant="contained" onClick={testClick}>
        Abrir loading dialog
      </Button>
      <AlertDialog
        {...dialogData}
        onClose={() => setDialogData(EMPTY_DIALOG)}
      />
    </>
  );
};

export default ProviderProfile;

const [openJob, setOpenJob] = useState(false);

// botón (dentro de la sección Trabajos)
<Button variant="outlined" onClick={() => setOpenJob(true)}>
  + Nuevo trabajo
</Button>

<AddJobForm
  open={openJob}
  onClose={() => setOpenJob(false)}
  onSave={async (data) => {
    await addJobToProvider(data); // POST a tu backend
    setOpenJob(false);
  }}
/>
