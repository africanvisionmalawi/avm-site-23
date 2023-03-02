import Img from "gatsby-image";
import React from "react";

export const Image = ({ fluid, fixed, alt, src }) => {
  const imageStyle = { borderRadius: "0" };
  //   const { childImageSharp, image } = imageInfo;
  //   const alt = imageInfo ? imageInfo.alt : "";
  if (fluid) {
    return <Img style={imageStyle} fluid={fluid} alt={alt} />;
  }

  if (fixed) {
    return <Img style={imageStyle} fixed={fixed} alt={alt} />;
  }

  if (src) return <img style={imageStyle} src={src} alt={alt} />;

  return null;
};
