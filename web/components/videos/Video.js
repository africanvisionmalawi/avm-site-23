import React from "react";
import { Player } from ".";

export const Video = ({ url, text }) => (
  <>
    {url ? <Player url={url} /> : null}
    <p>{text ? text : ""}</p>
  </>
);
