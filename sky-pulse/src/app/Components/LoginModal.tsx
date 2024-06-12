import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import * as React from "react";
import { useRouter } from "next/navigation";
import { CustomDialog, CustomPaper, CustomTextField } from "./CustomStyle";

export default function FormDialog({ handleLogin }: { handleLogin: (status: boolean) => void }) {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries((formData as any).entries());
    const username = formJson.firstName as string;
    const password = formJson.lastName as string;
    console.log(username);
    console.log(password);
    handleLogin(true);
    handleClose();
    router.push("/");
  };

  return (
    <React.Fragment>
      <Button className="btn" variant="contained" onClick={handleClickOpen}>
        Login
      </Button>
      <CustomDialog
        transitionDuration={500}
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: handleSubmit,
        }}
        PaperComponent={CustomPaper}
      >
        <DialogTitle sx={{ color: "white" }}>Login</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: "white" }}>Please enter your login credentials</DialogContentText>
          <CustomTextField
            autoFocus
            required
            margin="dense"
            id="username"
            name="username"
            label="Username"
            type="text"
            fullWidth
            variant="standard"
          />
          <CustomTextField
            autoFocus
            required
            margin="dense"
            id="password"
            name="password"
            label="Password"
            type="password"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button id="cancel" onClick={handleClose} color="error" variant="contained" size="medium">
            Cancel
          </Button>
          <Button id="login" type="submit" color="primary" variant="contained" size="medium">
            Login
          </Button>
        </DialogActions>
      </CustomDialog>
    </React.Fragment>
  );
}
