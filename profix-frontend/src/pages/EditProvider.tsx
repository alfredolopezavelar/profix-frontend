import { useLocation } from "wouter";
import useAuth from "../hooks/useAuth";
import { Box } from "@mui/material";
import UploadImgForm from "../components/UploadImgForm";

const EditProvider = () => {
  const { user, isAuthenticated } = useAuth();
  const [, setLocation] = useLocation();

  if (!isAuthenticated || !user || user.isProvider === false) {
    console.log("User must be authenticated as a provider");
    setLocation("/");
  }
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h1>Edit Provider Profile</h1>
      <hr></hr>
      <UploadImgForm />
    </Box>
  );
};

export default EditProvider;
