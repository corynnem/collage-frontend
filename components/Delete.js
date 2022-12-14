import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DeleteIcon from "@mui/icons-material/Delete";
import { DialogActions } from "@mui/material";
import { Snackbar, Alert } from "@mui/material";

export default function ExpandPhoto({ collage, expandDialogClose, setReload }) {
  const [openDialog, setOpenDialog] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarText, setSnackbarText] = useState("");

  const dialogOpen = () => {
    setOpenDialog(true);
  };

  const dialogClose = () => {
    setOpenDialog(false);
  };

  const snackbarOpen = () => {
    setOpenSnackbar(true);
    setSnackbarText("Collage deleted");
  };

  const snackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
  };

  const remove = () => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/collage/${collage.id}`, {
      method: "DELETE",
    })
      .then(() => snackbarOpen())
      .catch(() => setSnackbarText("Collage could not be deleted"));
    dialogClose();
    expandDialogClose();
    setReload(true);
  };

  return (
    <div>
      <Button
        onClick={dialogOpen}
        style={{
          color: "#6e5774",
          marginTop: "-25px",
          marginBotton: "-25px",
          float: "right",
        }}
      >
        <DeleteIcon style={{ height: "30px" }} />
      </Button>
      <Dialog
        open={openDialog}
        onClose={dialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        style={{ backgroundColor: "inherit" }}
      >
        <DialogContent>
          Are you sure you want to delete this collage?
        </DialogContent>
        <DialogActions>
          <Button onClick={dialogClose}>cancel</Button>
          <Button onClick={(e) => remove(e)} autoFocus>
            delete
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={snackbarClose}
      >
        <Alert
          onClose={snackbarClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          {snackbarText}
        </Alert>
      </Snackbar>
    </div>
  );
}
