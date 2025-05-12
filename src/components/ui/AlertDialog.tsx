import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

interface Props {
  title: string;
  message: string;
  btnMessage?: string;
  open: boolean;
  onClose: () => void;
}

const AlertDialog = ({ title, message, btnMessage, open, onClose }: Props) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} autoFocus>
          {btnMessage ? btnMessage : "Ok"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AlertDialog;
