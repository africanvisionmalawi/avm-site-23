import React from "react";
import { Player } from ".";

export const Video = (props) => {
  if (!props) {
    return;
  }
  const url = props.props ? props.props.url : props.url;
  const text = props.props ? props.props.text : props.text;
  return (
    <>
      {url ? <Player url={url} /> : null}
      <p>{text || ""}</p>
    </>
  );
};
