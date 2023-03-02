// youtube.js
import React from "react";
import { ImFilm } from "react-icons/im";
import { Video } from "../components/videos/Video";

const Preview = ({ value }) => {
  const { url, text } = value;
  return <Video url={url} text={text} />;
};

export default {
  name: "video",
  type: "object",
  title: "Video",
  icon: ImFilm,
  fields: [
    {
      title: "YouTube/Vimeo video URL",
      name: "url",
      type: "url",
    },
    {
      title: "Text",
      name: "text",
      type: "string",
    },
  ],
  preview: {
    select: {
      url: "url",
      text: "text",
    },
    component: Preview,
  },
};
