import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
  Chip,
  Rating,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { IProviderData, IShortProvider } from "../types";
import { Link } from "wouter";

interface Props {
  provider: IShortProvider | IProviderData;
  width?: string;
  providerId: string;
  userName: string;
}

export const ProviderCard = ({
  provider,
  width,
  providerId,
  userName,
}: Props) => {
  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        width: width || "auto",
        flexDirection: "column",
        borderRadius: 2,
        overflow: "hidden",
        transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
        },
      }}
    >
      <Box sx={{ position: "relative" }}>
        <CardMedia
          component="img"
          height="160"
          image={
            provider.coverPhotoURL
              ? provider.coverPhotoURL
              : "https://images.unsplash.com/photo-1567954970774-58d6aa6c50dc?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          alt={`${userName} profile image`}
        />
        <Box
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            bgcolor: "white",
            color: "#007BFF",
            borderRadius: "16px",
            px: 1,
            py: 0.5,
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography variant="body2" fontWeight="medium" sx={{ mr: 0.5 }}>
            {provider.stars.toFixed(1)}
          </Typography>
          <Rating
            value={provider.stars}
            readOnly
            size="small"
            precision={0.5}
          />
        </Box>
      </Box>

      <CardContent
        sx={{ p: 2, flexGrow: 1, display: "flex", flexDirection: "column" }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
          <Box>
            <Typography variant="h6" component="h3" sx={{ fontWeight: "bold" }}>
              {userName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {provider.categoryName}
            </Typography>
          </Box>
          <Chip
            label={`$${provider.hourlyRate}/hr`}
            size="small"
            sx={{
              bgcolor: "rgba(0, 51, 102, 0.1)",
              color: "primary.main",
              fontWeight: "medium",
            }}
          />
        </Box>

        <Typography variant="body2" sx={{ mb: 1.5 }} paragraph>
          {provider.description.length > 85
            ? `${provider.description.substring(0, 85)}...`
            : provider.description}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", mb: 2, mt: "auto" }}>
          <LocationOnIcon
            fontSize="small"
            sx={{ color: "text.secondary", fontSize: "0.875rem", mr: 0.5 }}
          />
          <Typography variant="body2" color="text.secondary">
            {provider.location}
          </Typography>
        </Box>

        <Button
          component={Link}
          to={`/providers/${providerId}`}
          variant="contained"
          color="info"
          fullWidth
          sx={{ mt: "auto" }}
        >
          Ir a perfil
        </Button>
      </CardContent>
    </Card>
  );
};
