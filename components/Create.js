import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Input from "@mui/material/Input";
import { Snackbar, Alert } from "@mui/material";

export default function Create({ openDialog, setOpenDialog, allCollages }) {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarText, setSnackbarText] = useState("");
  const [inputChanged, setInputChanged] = useState(false);
  const [photo, setPhoto] = useState({});
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");

  const dialogOpen = () => {
    setOpenDialog(true);
  };

  const dialogClose = () => {
    setOpenDialog(false);
  };

  const snackbarOpen = () => {
    setOpenSnackbar(true);
  };

  const snackbarClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
  };

  const post = (json) => {
    let photoLink = json.secure_url;

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/collage/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
        link,
        photoLink,
      }),
    })
      .then((res) => res.json())
      .then(() => setSnackbarText("Collage added!"))
      .then(() => snackbarOpen())
      .catch(() => setSnackbarText("Failed to add collage"));
    allCollages();
  };

  const upload = () => {
    const formdata = new FormData();
    formdata.append("file", photo);
    formdata.append("upload_preset", "fgzqgjzr");

    if (photo.type === "video/mp4") {
      fetch("https://api.cloudinary.com/v1_1/corynnemm/video/upload", {
        method: "POST",
        body: formdata,
      })
        .then((res) => res.json())
        .then((json) => post(json))
        .catch(() => setSnackbarText("File type not supported"));
    } else {
      fetch("https://api.cloudinary.com/v1_1/corynnemm/image/upload", {
        method: "POST",
        body: formdata,
      })
        .then((res) => res.json())
        .then((json) => post(json))
        .catch(() => setSnackbarText("File type not supported"));
    }

    dialogClose();
  };

  const onFileChange = (e) => {
    setPhoto(e.target.files[0]);
    setInputChanged(true);
  };

  return (
    <div>
      <Button
        // variant="outlined"
        onClick={dialogOpen}
        style={{ color: "#6e5774" }}
      >
        + Collage
      </Button>
      <Dialog
        open={openDialog}
        onClose={dialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          id="alert-dialog-title"
          style={{ backgroundColor: "#290025", color: "#6e5774" }}
        >
          Add Collage
        </DialogTitle>
        <DialogContent style={{ backgroundColor: "#290025" }}>
          <DialogContentText id="alert-dialog-description">
            <br />
            <Button
              variant="contained"
              component="label"
              style={{ backgroundColor: "#35012c", color: "#6e5774" }}
            >
              {inputChanged ? "Files Added" : "Upload Files"}
              <input
                type="file"
                multiple
                hidden
                onChange={(e) => onFileChange(e)}
              />
            </Button>
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{ backgroundColor: "#290025", color: "#6e5774" }}>
          <Button
            onClick={dialogClose}
            style={{ backgroundColor: "#290025", color: "#6e5774" }}
          >
            cancel
          </Button>
          <Button
            onClick={(e) => upload(e)}
            autoFocus
            style={{ backgroundColor: "#290025", color: "#6e5774" }}
          >
            submit
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
