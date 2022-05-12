import React from "react";

const Banner = (props) => {
  const { title, subtitle, imgUrl } = props;
  const handleOnPlay = () => {
    console.log("play");
  }

  return (
    <div>
      
      <h3>{title}</h3>
      <h6>{subtitle}</h6>
      <button onClick={handleOnPlay}>Play</button>
      <div
        style={{
          backgroundImage: `url(${imgUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "50% 50%",
          width: "100%",
          height: "100%",
          position: "absolute",
        }}
      ></div>
    </div>
  );
};

export default Banner;
