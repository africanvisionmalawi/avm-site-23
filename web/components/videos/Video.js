import React from "react";
import { Player } from ".";

export const Video = (props) => {
  if (!props.props) {
    return;
  }
  const { url, text } = props.props.value;
  return (
    <>
      {url ? <Player url={url} /> : null}
      <p>{text || ""}</p>
    </>
  );
};
