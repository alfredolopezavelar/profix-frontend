import { Box, Card, CardContent, Typography } from "@mui/material";

interface Props {
  icon: React.JSX.Element;
  name: string;
  quantity: number;
}

const CategoryCard = ({ icon, name, quantity }: Props) => {
  return (
    <Card
      sx={{
        textAling: "center",
        height: "100%",
        transition: "transform 0.3s ease-in-out",
        "&:hover": {
          transform: "translateY(-4px)",
        },
      }}
    >
      <CardContent>
        <Box
          sx={{
            bgcolor: "rgba(0, 179, 179, 0.1)",
            borderRadius: "50%",
            width: 64,
            height: 64,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mx: "auto",
            mb: 2,
          }}
        >
          {icon}
        </Box>
        <Typography variant="subtitle1" component="h3" fontWeight="medium">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {quantity} Proveedores
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CategoryCard;
