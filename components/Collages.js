import React from "react";
import ExpandPhoto from "./ExpandPhoto";
import ExpandVideo from "./ExpandVideo";

const Collages = ({ collage, index }) => {
  return (
    <div>
      {collage.photoLink.includes("mp4") ? (
        <ExpandVideo collage={collage} index={index} />
      ) : (
        <ExpandPhoto collage={collage} index={index} />
      )}
    </div>
  );
};

export default Collages;
