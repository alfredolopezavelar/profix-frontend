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
  Typography,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LocalPhoneRoundedIcon from "@mui/icons-material/LocalPhoneRounded";
import StarIcon from "@mui/icons-material/Star";
import AlertDialog from "../components/ui/AlertDialog";
import SkeletonProfile from "../components/ui/SkeletonProfile";

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

const testBool = false;

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
                          value={provider.providerData!.stars}
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
                          {provider.providerData!.stars.toFixed(1)}
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
                    variant="h5"
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
