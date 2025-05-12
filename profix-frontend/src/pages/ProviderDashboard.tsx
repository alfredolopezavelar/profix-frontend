import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import { mockProviders } from "../dev-data/data";

const ProviderDashboard = () => {
  const provider = mockProviders[0];

  return (
    <Box sx={{ py: 6 }}>
      <Typography variant="h4" fontWeight="bold" color="primary" gutterBottom>
        Resumen del proveedor
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: "center" }}>
              <Typography variant="h3" color="info.main" fontWeight="bold">
                {provider.providerData?.totalReviews}
              </Typography>
              <Typography variant="body2">Reseñas</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: "center" }}>
              <Typography variant="h3" color="info.main" fontWeight="bold">
                {provider.providerData?.jobs.length}
              </Typography>
              <Typography variant="body2">Trabajos</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: "center" }}>
              <Typography variant="h3" color="info.main" fontWeight="bold">
                {provider.providerData?.averageRating.toFixed(1)}
              </Typography>
              <Typography variant="body2">Rating</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: "center" }}>
              <Typography variant="h3" color="info.main" fontWeight="bold">
                ${provider.providerData?.hourlyRate}
              </Typography>
              <Typography variant="body2">Tarifa / hr</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProviderDashboard;
