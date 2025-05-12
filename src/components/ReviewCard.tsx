import { Box, Typography, Rating, Avatar, Paper } from "@mui/material";
import { IReview } from "../types";

interface ReviewCardProps {
  review: IReview;
}

export const ReviewCard = ({ review }: ReviewCardProps) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        mb: 2,
        bgcolor: "rgba(0, 0, 0, 0.02)",
        borderRadius: 2,
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1.5 }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Avatar
            alt={review.userName}
            sx={{ width: 40, height: 40, mr: 1.5 }}
          />
          <Box>
            <Typography
              variant="subtitle2"
              component="div"
              sx={{ fontWeight: "medium" }}
            >
              {review.userName}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {review.date}
            </Typography>
          </Box>
        </Box>

        <Rating value={review.stars} readOnly size="small" precision={0.5} />
      </Box>

      <Typography variant="body2" component="p">
        {review.comment}
      </Typography>
    </Paper>
  );
};

export default ReviewCard;
