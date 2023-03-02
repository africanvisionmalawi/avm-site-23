import styled from "@emotion/styled";
import { useEffect, useState } from "react";

const VIDEO_TYPE_YOUTUBE = "isYouTube";
const VIDEO_TYPE_VIMEO = "isVimeo";

const VidCont = styled.div`
  border-radius: 8px;
  cursor: pointer;
  height: 0;
  padding-bottom: 56.25%;
  position: relative;
  overflow: hidden;
  & img,
  & iframe {
    border: 0;
    bottom: 0;
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
  }
`;

const IconWrapper = styled.div`
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
  position: absolute;
  width: 100%;
  & svg {
    height: 60px;
    width: 60px;
    z-index: 1;
  }
`;

const Loading = styled.div`
  background: #cacaca;
`;

const checkVideoType = (url) => {
  const youtubeUrls = ["youtube", "youtu.be"];
  const vimeoUrls = ["vimeo"];

  const isYoutube = youtubeUrls.some((e) => url.includes(e));
  const isVimeo = url.includes("vimeo");
  return isYoutube ? VIDEO_TYPE_YOUTUBE : VIDEO_TYPE_VIMEO;
};

export const Player = ({ url }) => {
  const [displayVideo, setDisplayVideo] = useState(false);
  const [displayImage, setDisplayImage] = useState(false);
  const videoType = checkVideoType(url);
  const [video, setVideo] = useState({
    id: "",
    thumbnail_url: "",
    baseUrl: "",
  });

  const handleThumbnailOnClick = () => {
    setDisplayVideo(true);
  };

  const getVideoData = (videoType, url) => {
    if (videoType === VIDEO_TYPE_YOUTUBE) {
      // console.log("youtube ", url);
      let id = "";
      url = url
        .replace(/(>|<)/gi, "")
        .split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
      if (url[2] !== undefined) {
        id = url[2].split(/[^0-9a-z_\-]/i);
        id = id[0];
      } else {
        id = url;
      }

      // const id = url.split("v=")[1].substring(0, 11);
      // console.log("id ", id);
      setVideo({
        id: id,
        baseUrl: "//www.youtube.com/embed/",
        thumbnail_url: `//img.youtube.com/vi/${id}/0.jpg`,
      });
    }
    if (videoType === VIDEO_TYPE_VIMEO) {
      fetch("https://vimeo.com/api/oembed.json?url=" + url, { method: "GET" })
        .then((response) => response.json())
        .then((vid) => {
          setVideo({
            id: vid.video_id,
            baseUrl: "https://player.vimeo.com/video/",
            thumbnail_url: vid.thumbnail_url,
          });
          // console.log("video.thumbnail_url ", video.thumbnail_url);
        })
        .catch((error) => console.error("error:", error));
    }
  };

  useEffect(() => {
    getVideoData(videoType, url);
    setDisplayImage(true);
  }, []);

  return (
    <VidCont onClick={handleThumbnailOnClick}>
      {displayVideo ? (
        <iframe
          src={`${video.baseUrl}${video.id}?autoplay=1`}
          width="560"
          height="315"
          frameborder="0"
          allowfullscreen
          title="Video "
        ></iframe>
      ) : displayImage ? (
        <>
          <IconWrapper>
            <svg height="100%" version="1.1" viewBox="0 0 68 48" width="100%">
              <path
                class="ytp-large-play-button-bg"
                d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z"
                fill="#f00"
              ></path>
              <path d="M 45,24 27,14 27,34" fill="#fff"></path>
            </svg>
          </IconWrapper>
          <img
            src={video.thumbnail_url}
            alt={
              videoType === VIDEO_TYPE_YOUTUBE ? "Youtube video" : "Vimeo video"
            }
          />
        </>
      ) : (
        <Loading />
      )}
    </VidCont>
  );
};
