import React from "react";
import backImage from "../../images/home.jpg";

const Hero = ({children, img, disableOverlay}) => {
  const image = img ? img : backImage;
  return <div className="hero-img-container"
      style={{
        backgroundImage: `url(${image})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
    <div className={`${!disableOverlay ? "hero-overlay" : ""}`}>
      <div className="container hero-container">
        {children}
      </div>
    </div>
  </div>;
};

export default Hero;
