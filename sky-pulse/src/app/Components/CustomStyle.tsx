import Dialog, { DialogProps } from "@mui/material/Dialog";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";

export const CustomTextField = styled(TextField)(({ theme }) => ({
  "& label": {
    color: "white",
  },
  "& label.Mui-focused": {
    color: "white",
  },
  "& .MuiInput-underline:before": {
    borderBottomColor: "white",
  },
  "&:hover .MuiInput-underline:before": {
    borderBottomColor: theme.palette.primary.main,
  },
  "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
    borderBottomColor: theme.palette.primary.main,
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: theme.palette.primary.main,
  },
  "& .MuiInputBase-input": {
    color: "white",
  },
}));

export const CustomPaper = styled(Paper)(({ theme }) => ({
  borderRadius: "20px",
  backdropFilter: "blur(0px)",
  color: "white",
  background: "linear-gradient(112.1deg, rgba(32, 38, 57, 1) 25%, rgba(63, 76, 119, 1) 99%)",
  transition: "backdrop-filter 0.5s ease-in-out",
  border: "2px solid rgba(100,100,100,0.8)"
}));

const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiPaper-root": {
    transition: "backdrop-filter 0.5s ease-in-out",
  },
  "& .MuiPaper-root.MuiDialog-paper": {
    backdropFilter: "blur(20px)",
  },
}));

export const CustomDialog = (props: DialogProps) => {
  const { open, onClose, ...otherProps } = props;

  const handleClose = (event: React.SyntheticEvent, reason: "backdropClick" | "escapeKeyDown") => {
    if (reason === "backdropClick" || reason === "escapeKeyDown" || !onClose) {
      return;
    }
    onClose(event, reason);
  };

  return <StyledDialog PaperComponent={(paperProps) => <CustomPaper {...paperProps} />} open={open} onClose={handleClose} {...otherProps} />;
};
