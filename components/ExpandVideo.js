import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Delete from "./Delete";

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
        <video
          muted
          autoPlay
          loop
          style={{ height: "300px" }}
          id={`video-${index}`}
        >
          <source src={collage.photoLink} type="video/mp4" />
        </video>
      </Button>
      <Dialog
        open={openDialog}
        onClose={dialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        style={{ backgroundColor: "inherit" }}
      >
        <DialogContent>
          <video
            muted
            autoPlay
            loop
            style={{ height: "80vh" }}
            id={`video-${index}`}
          >
            <source src={collage.photoLink} type="video/mp4" />
          </video>
        </DialogContent>
      </Dialog>
    </div>
  );
}
