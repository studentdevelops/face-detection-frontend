import React from "react";
import "./DisplayImage.css";

const DisplayImage = ({ img, box }) => {
  return (
    <div className="center-div">
      <div className="img">
        <img id="img" src={img} alt="" width="400px" height="auto" />
        <div
          className="bounding-box"
          style={{
            top: box.top,
            left: box.left,
            right: box.right,
            bottom: box.bottom,
          }}
        ></div>
      </div>
    </div>
  );
};

export default DisplayImage;
