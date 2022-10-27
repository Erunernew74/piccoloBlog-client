import React from "react";
import ClimbingBoxLoader from "react-spinners/ClipLoader";

const Loader = () => {
  return (
    <div>
      <ClimbingBoxLoader
        color={"123abc"}
        size={30}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default Loader;
