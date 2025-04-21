import { useState } from "react";
import { mockCategories, mockProviders } from "../dev-data/data";
import SearchIcon from "@mui/icons-material/Search";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import PlumbingIcon from "@mui/icons-material/Plumbing";
import ElectricalServicesIcon from "@mui/icons-material/ElectricalServices";
import HandymanIcon from "@mui/icons-material/Handyman";
import FormatPaintIcon from "@mui/icons-material/FormatPaint";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { Link } from "wouter";
import CategoryCard from "../components/ui/CategoryCard";
import SkeletonCard from "../components/ui/SkeletonCard";
import { ProviderCard } from "../components/ProviderCard";

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // CHANGE THIS FOR THE API CALL

  //const providers = mockProviders;
  const categories = mockCategories;
  const providers = mockProviders;

  // This variable is for the providers API
  const isLoadingProv = false;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(searchQuery);
  };

  const getCategoryIcon = (categoryName: string) => {
    const iconProps = { sx: { fontSize: 40, color: "#00B3B3" } };

    switch (categoryName.toLowerCase()) {
      case "plomeria":
        return <PlumbingIcon {...iconProps} />;
      case "electrica":
        return <ElectricalServicesIcon {...iconProps} />;
      case "carpinteria":
        return <HandymanIcon {...iconProps} />;
      case "pintores":
        return <FormatPaintIcon {...iconProps} />;
      case "hvac":
        return <AcUnitIcon {...iconProps} />;
      case "limpieza":
        return <CleaningServicesIcon {...iconProps} />;
      default:
        return <HandymanIcon {...iconProps} />;
    }
  };

  return (
    <Box sx={{ minHeight: "100vh" }}>
      <Box
        sx={{
          backgroundImage: "linear-gradient(to right, #003366, #00B3B3)",
          py: 6,
          mb: 6,
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              maxWidth: { xs: "100%", md: "66%" },
              color: "white",
              p: 4,
            }}
          >
            <Typography
              variant="h3"
              component="h1"
              fontWeight="bold"
              gutterBottom
            >
              Encuentra proveedores de servicios en Guadalajara
            </Typography>
            <Typography variant="h6" sx={{ mb: 4 }}>
              Encuentra electricistas, jardineros, carpinteros y más
              presatodores de servicio de confianza
            </Typography>
            <Box
              component="form"
              onSubmit={handleSearch}
              sx={{
                display: "flex",
                bgcolor: "white",
                borderRadius: 1,
                overflow: "hidden",
                boxShadow: 1,
              }}
            >
              <TextField
                fullWidth
                placeholder="Que servicio busca?"
                variant="outlined"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { border: "none" },
                  },
                  "& .MuiInputBase-input": {
                    color: "text.primary",
                    p: 2,
                  },
                }}
              />
              <Button
                type="submit"
                variant="contained"
                color="info"
                startIcon={<SearchIcon />}
                sx={{
                  borderRadius: 0,
                  px: 4,
                }}
              >
                Buscar
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Categorias */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 4,
          }}
        >
          <Typography
            variant="h4"
            component="h2"
            fontWeight="bold"
            color="primary"
          >
            Categorías de servicios
          </Typography>
          <Button
            component={Link}
            to="/search"
            color="info"
            endIcon={<ArrowForwardIcon />}
          >
            Ver más
          </Button>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {categories.map((cat) => (
            <CategoryCard
              key={cat.id}
              icon={getCategoryIcon(cat.slug)}
              name={cat.name}
              quantity={cat.numberProviders}
            />
          ))}
        </Box>
      </Container>

      {/* Featured providers */}

      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 4,
          }}
        >
          <Typography
            variant="h4"
            component="h2"
            fontWeight="bold"
            color="primary"
          >
            Proveedores Destacados
          </Typography>
          <Button
            component={Link}
            to="/search"
            color="info"
            endIcon={<ArrowForwardIcon />}
          >
            Ver más
          </Button>
        </Box>
        <Box
          display="flex"
          flexWrap="wrap"
          gap={4}
          sx={{ justifyContent: "center" }}
        >
          {(isLoadingProv ? Array.from(new Array(3)) : providers).map(
            (item, index) => (
              <Box
                key={item?.id ?? index}
                sx={{
                  flex: {
                    xs: "0 0 100%",
                    sm: "0 0 100%",
                    md: "0 0 50%",
                    lg: "0 0 33.3333%",
                    xl: "0 0 25%",
                  },
                  maxWidth: {
                    xs: "100%",
                    sm: "100%",
                    md: "50%",
                    lg: "33.3333%",
                    xl: "25%",
                  },
                }}
              >
                {isLoadingProv ? (
                  <SkeletonCard />
                ) : (
                  <ProviderCard
                    provider={item.providerData}
                    providerId={item.id}
                  />
                )}
              </Box>
            )
          )}
        </Box>
      </Container>

      {/* Banner de publicidad */}
      <Box sx={{ bgcolor: "secondary.main", py: 4, mb: 8 }}>
        <Container maxWidth="lg">
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignItems: "center",
              justifyContent: "space-between",
              color: "white",
            }}
          >
            <Box sx={{ mb: { xs: 3, md: 0 }, maxWidth: { md: "66%" } }}>
              <Typography
                variant="h4"
                component="h2"
                fontWeight="bold"
                gutterBottom
              >
                Eres un proveedor de servicios profesional?
              </Typography>
              <Typography variant="h6">
                Unete a nuestra plataforma y conecta con clientes en busca de
                tus servicios en Guadalajara.
              </Typography>
            </Box>
            <Button
              variant="contained"
              sx={{
                bgcolor: "white",
                color: "secondary.main",
                px: 4,
                py: 1.5,
                fontWeight: "medium",
                "&:hover": {
                  bgcolor: "rgba(255, 255, 255, 0.9)",
                },
              }}
              component={Link}
              to="/provider-login"
            >
              Registrate como proveedor
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Espacio de como funciona */}
      <Box
        display="flex"
        flexWrap="wrap"
        justifyContent={{
          xs: "center",
          sm: "center",
          md: "center",
          lg: "space-between",
          xl: "space-between",
        }}
        gap={2}
      >
        <Box
          sx={{
            width: { xs: "100%", sm: "100%", md: "48%", lg: "32%", xl: "32%" },
            paddingY: 1,
          }}
        >
          <Box sx={{ textAlign: "center" }}>
            <Box
              sx={{
                bgcolor: "rgba(0, 51, 102, 0.1)",
                borderRadius: "50%",
                width: 80,
                height: 80,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mx: "auto",
                mb: 2,
              }}
            >
              <SearchOutlinedIcon
                sx={{ fontSize: 40, color: "primary.main" }}
              />
            </Box>
            <Typography
              variant="h5"
              component="h3"
              fontWeight="bold"
              gutterBottom
            >
              Encuentra
            </Typography>
            <Typography>
              Busca en nuestro catálogo de profesionales calificados de
              servicios en Guadalajara.
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            width: { xs: "100%", sm: "100%", md: "48%", lg: "32%", xl: "32%" },
            paddingY: 1,
          }}
        >
          <Box sx={{ textAlign: "center" }}>
            <Box
              sx={{
                bgcolor: "rgba(0, 51, 102, 0.1)",
                borderRadius: "50%",
                width: 80,
                height: 80,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mx: "auto",
                mb: 2,
              }}
            >
              <CalendarMonthIcon sx={{ fontSize: 40, color: "primary.main" }} />
            </Box>
            <Typography
              variant="h5"
              component="h3"
              fontWeight="bold"
              gutterBottom
            >
              Agenda
            </Typography>
            <Typography>
              Programa citas directamente con los proovedores a base de su
              disponibilidad.
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            width: { xs: "100%", sm: "100%", md: "48%", lg: "32%", xl: "32%" },
            paddingY: 1,
          }}
        >
          <Box sx={{ textAlign: "center" }}>
            <Box
              sx={{
                bgcolor: "rgba(0, 51, 102, 0.1)",
                borderRadius: "50%",
                width: 80,
                height: 80,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mx: "auto",
                mb: 2,
              }}
            >
              <DoneAllIcon sx={{ fontSize: 40, color: "primary.main" }} />
            </Box>
            <Typography
              variant="h5"
              component="h3"
              fontWeight="bold"
              gutterBottom
            >
              Califícalos
            </Typography>
            <Typography>
              Deja reseñas de los proveedores para que otros usuarios puedan
              conocer tu experiencia y opinión sobre de sus servicios.
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default HomePage;
