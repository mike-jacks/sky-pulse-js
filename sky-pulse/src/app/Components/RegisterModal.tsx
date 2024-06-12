"use client";

import { CustomTextField, CustomDialog, CustomPaper } from "./CustomStyle";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import * as React from "react";


export default function FormDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    const firstName = formJson.firstName as string;
    const lastName = formJson.lastName as string;
    const email = formJson.email as string;
    const username = formJson.username as string;
    const password = formJson.password as string;
    console.log(firstName);
    console.log(lastName);
    console.log(email);
    console.log(username);
    console.log(password);
    handleClose();
  }

  return (
    <React.Fragment>
      <Button className="btn" variant="contained" onClick={handleClickOpen}>
        Register
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
        <DialogTitle sx={{ color: "white"}}>Register</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: "white" }}>Please enter your registration information</DialogContentText>
          <CustomTextField autoFocus required margin="dense" id="firstName" name="firstName" label="First Name" type="text" fullWidth variant="standard" />
          <CustomTextField autoFocus required margin="dense" id="lastName" name="lastName" label="Last Name" type="text" fullWidth variant="standard" />
          <CustomTextField autoFocus required margin="dense" id="email" name="email" label="Email Address" type="email" fullWidth variant="standard" />
          <CustomTextField autoFocus required margin="dense" id="username" name="username" label="Username" type="text" fullWidth variant="standard" />
          <CustomTextField autoFocus required margin="dense" id="password" name="password" label="Password" type="password" fullWidth variant="standard" />
        </DialogContent>
        <DialogActions>
          <Button id="cancel" onClick={handleClose} color="error" variant="contained" size="medium">Cancel</Button>
          <Button id="register" type="submit" color="primary" variant="contained" size="medium">Register</Button>
        </DialogActions>
      </CustomDialog>
    </React.Fragment>
  );
}
