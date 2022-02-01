import React from "react";

const IntroText = ({ name, entries}) => {
  return (
    <div>
      <p className="center highlight">
        {name} has Detected #{entries} Faces..
      </p>
      <p className="center">
        This Magic Brain will detect faces in your pictures
      </p>
    </div>
  );
};

export default IntroText;
