import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
  } from "@mui/material";
  import { useState } from "react";
  
  interface Props {
    open: boolean;
    onClose: () => void;
    onSave: (data: { title: string; description: string; image: File }) => void;
  }
  
  const AddJobForm = ({ open, onClose, onSave }: Props) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState<File | null>(null);
  
    const handleSubmit = () => {
      if (!title || !image) return;
      onSave({ title, description, image });
      setTitle("");
      setDescription("");
      setImage(null);
    };
  
    return (
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle>Agregar nuevo trabajo</DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2} mt={1}>
            <TextField
              label="Título*"
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <TextField
              label="Descripción"
              multiline
              rows={3}
              fullWidth
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <Button variant="outlined" component="label">
              {image ? "Cambiar imagen" : "Subir imagen*"}
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={(e) => setImage(e.target.files?.[0] || null)}
              />
            </Button>
            {image && (
              <Box
                component="img"
                src={URL.createObjectURL(image)}
                alt="preview"
                sx={{ width: "100%", maxHeight: 200, objectFit: "cover", borderRadius: 1 }}
              />
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancelar</Button>
          <Button onClick={handleSubmit} variant="contained" disabled={!title || !image}>
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    );
  };
  
  export default AddJobForm;
  