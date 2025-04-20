import { Box, Card, CardContent } from "@mui/material";

interface Props {
  height?: string | number;
  width?: string | number;
}

const SkeletonCard = ({ height = 360, width = 280 }: Props) => {
  return (
    <Card sx={{ height: height, width: width }}>
      <Box sx={{ bgcolor: "rgba(0, 0, 0, 0.05)", height: 160 }} />
      <CardContent>
        <Box
          sx={{
            bgcolor: "rgba(0, 0, 0, 0.05)",
            height: 24,
            width: "60%",
            mb: 1,
          }}
        />
        <Box
          sx={{
            bgcolor: "rgba(0, 0, 0, 0.05)",
            height: 16,
            width: "40%",
            mb: 2,
          }}
        />
        <Box
          sx={{
            bgcolor: "rgba(0, 0, 0, 0.05)",
            height: 60,
            mb: 2,
          }}
        />
        <Box sx={{ bgcolor: "rgba(0, 0, 0, 0.05)", height: 36 }} />
      </CardContent>
    </Card>
  );
};

export default SkeletonCard;
