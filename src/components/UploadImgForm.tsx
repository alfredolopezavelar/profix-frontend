import { CloudUpload } from "@mui/icons-material";
import { Button, TextField, Box } from "@mui/material";
import { useState } from "react";
import { uploadImage } from "../services/handleImages";

const UploadImgForm = () => {
  const [file, setFile] = useState<File | null>();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      alert("Selecciona una imagen antes de enviar");
      return;
    }
    try {
      const imgUrl = await uploadImage(file);
      console.log(imgUrl);
      alert("Imagen subida correctamente");
    } catch (err) {
      alert("Error al subir la imagen");
    }
  };

  const fileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setFile(file);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <TextField
          type="file"
          onChange={fileSelected}
          variant="outlined"
          inputProps={{ accept: "image/*" }}
          fullWidth
          margin="normal"
          name="image"
        />
        <Button
          variant="contained"
          color="secondary"
          startIcon={<CloudUpload />}
          sx={{ margin: 2, padding: "10px 20px" }}
          type="submit"
        >
          Subir imagen
        </Button>
      </Box>
    </form>
  );
};

export default UploadImgForm;
