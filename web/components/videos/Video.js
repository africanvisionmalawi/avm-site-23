import React from "react";
import { Player } from ".";

export const Video = (props) => {
  console.log("url etc ", props);
  console.log("value ", props.props.index);
  const { url, text } = props.props.value;
  return (
    <>
      {url ? <Player url={url} /> : null}
      <p>{text || ""}</p>
    </>
  );
};
