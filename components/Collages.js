import React from "react";
import ExpandPhoto from "./ExpandPhoto";
import ExpandVideo from "./ExpandVideo";

const Collages = ({ collage, index, setReload }) => {
  return (
    <div>
      {collage.photoLink.includes("mp4") ? (
        <ExpandVideo collage={collage} index={index} setReload={setReload} />
      ) : (
        <ExpandPhoto collage={collage} index={index} setReload={setReload} />
      )}
    </div>
  );
};

export default Collages;
