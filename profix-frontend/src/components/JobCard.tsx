import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { IProviderJobs } from "../types";

interface Props {
  job: IProviderJobs;
}

const JobCard = ({ job }: Props) => {
  return (
    <Card sx={{ maxWidth: 400 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={job.imageURL !== null ? job.imageURL : undefined}
          alt="Espacio de image"
        />
        <CardContent>
          <Typography gutterBottom variant="h4" component="div">
            {job.title}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {job.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
