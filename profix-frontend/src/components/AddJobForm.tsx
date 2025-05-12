import { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";

interface Props {
  open: boolean;
  onClose: () => void;
  onSave: (data: { title: string; description: string; image: File }) => void;
}

const AddJobForm = ({ open, onClose, onSave }: Props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setImage(file);
    if (file) setPreview(URL.createObjectURL(file));
  };

  const handleSave = () => {
    if (image && title) {
      onSave({ title, description, image });
      setTitle("");
      setDescription("");
      setImage(null);
      setPreview(null);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Nuevo trabajo</DialogTitle>
      <DialogContent dividers>
        <TextField
          label="Título*"
          fullWidth
          sx={{ mb: 2 }}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          label="Descripción"
          multiline
          rows={3}
          fullWidth
          sx={{ mb: 2 }}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Button
          component="label"
          variant="outlined"
          color="info"
          startIcon={<PhotoCamera />}
        >
          {image ? "Cambiar imagen" : "Subir imagen*"}
          <input type="file" hidden accept="image/*" onChange={handleImg} />
        </Button>
        {preview && (
          <Box
            component="img"
            src={preview}
            alt="preview"
            sx={{ width: "100%", mt: 2, borderRadius: 1 }}
          />
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button
          onClick={handleSave}
          variant="contained"
          disabled={!title || !image}
        >
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddJobForm;
