import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Delete from "./Delete";
import { Snackbar, Alert } from "@mui/material";

export default function ExpandPhoto({ collage, index }) {
  const [openDialog, setOpenDialog] = useState(false);

  const dialogOpen = () => {
    setOpenDialog(true);
  };

  const dialogClose = () => {
    setOpenDialog(false);
  };

  return (
    <div>
      <Delete collage={collage} />
      <Button onClick={dialogOpen} style={{ color: "#6e5774", margin: "10px" }}>
        <img
          id={`image-${index}`}
          src={collage.photoLink}
          style={{ height: "300px" }}
        />
      </Button>
      <Dialog
        open={openDialog}
        onClose={dialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        style={{ backgroundColor: "inherit" }}
      >
        <DialogContent>
          <img
            id={`image-${index}`}
            src={collage.photoLink}
            style={{ height: "80vh" }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
