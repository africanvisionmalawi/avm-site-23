import React from "react";
import { Player } from ".";

export const Video = (props) => {
  if (!props) {
    return;
  }
  const { url, text } = props;

  return (
    <>
      {url ? <Player url={url} /> : null}
      <p>{text || ""}</p>
    </>
  );
};
