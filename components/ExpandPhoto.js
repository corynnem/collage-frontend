import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Delete from "./Delete";
import { Snackbar, Alert } from "@mui/material";

export default function ExpandPhoto({ collage, index, setReload }) {
  const [openDialog, setOpenDialog] = useState(false);

  const dialogOpen = () => {
    setOpenDialog(true);
  };

  const dialogClose = () => {
    setOpenDialog(false);
  };

  return (
    <div>
      <Button onClick={dialogOpen} style={{ color: "#6e5774", margin: "10px" }}>
        <img
          id={`image-${index}`}
          src={collage.photoLink}
          style={{ width: "200px" }}
        />
      </Button>
      <Dialog
        open={openDialog}
        onClose={dialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        style={{ backgroundColor: "inherit" }}
      >
        <DialogContent style={{ backgroundColor: "inherit" }}>
          <Delete
            collage={collage}
            color="disabled"
            expandDialogClose={() => dialogClose()}
            setReload={setReload}
          />
          <img
            id={`image-${index}`}
            src={collage.photoLink}
            style={{ width: "70vw", maxWidth: "400px" }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
