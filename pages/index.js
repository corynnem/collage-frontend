import Collages from "../components/Collages";
import Create from "../components/Create";
import { useState, useEffect } from "react";
import { Paper } from "@mui/material";

export default function Home() {
  const [collages, setCollages] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [reload, setReload] = useState(false);

  const allCollages = () => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/collage/all`)
      .then((res) => res.json())
      .then((json) => setCollages(json.collages.reverse()))
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    allCollages();
    setReload(false);
  }, [reload]);

  return (
    <Paper
      style={{
        height: "90vh",
        backgroundColor: "#290025",
        padding: "20px",
        margin: "20px",
        color: "#6e5774",
        textAlign: "center",
        overflowY: "scroll",
      }}
    >
      <h1>Collages</h1>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Create
          openDialog={openDialog}
          setOpenDialog={setOpenDialog}
          allCollages={allCollages}
          reload={reload}
          setReload={setReload}
        />
        <Paper
          style={{
            display: "flex",
            flexDirection: "row",
            maxWidth: "75vw",
            minWidth: "50vw",
            backgroundColor: "#35012c",
            flexWrap: "wrap",
            justifyContent: "space-around",
          }}
        >
          {collages.length > 0 ? (
            collages.map((collage, i) => {
              return (
                <div key={i}>
                  <Collages collage={collage} index={i} setReload={setReload} />
                </div>
              );
            })
          ) : (
            <h1>no collages here</h1>
          )}
        </Paper>
      </div>
    </Paper>
  );
}
