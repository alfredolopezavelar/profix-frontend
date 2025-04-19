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

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // CHANGE THIS FOR THE API CALL

  const providers = mockProviders;
  const categories = mockCategories;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(searchQuery);
  };

  const getCategoryIcon = (categoryName: string) => {
    const iconProps = { sx: { fontSize: 40, color: "#00B3B3" } };

    switch (categoryName.toLowerCase()) {
      case "plumbing":
        return <PlumbingIcon {...iconProps} />;
      case "electrical":
        return <ElectricalServicesIcon {...iconProps} />;
      case "carpentry":
        return <HandymanIcon {...iconProps} />;
      case "painting":
        return <FormatPaintIcon {...iconProps} />;
      case "hvac":
        return <AcUnitIcon {...iconProps} />;
      case "cleaning":
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
              quantity={cat.providersCount}
            />
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default HomePage;
