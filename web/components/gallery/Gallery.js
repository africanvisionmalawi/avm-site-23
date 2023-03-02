import { DialogContent, DialogOverlay } from "@reach/dialog";
import { Image } from "components/common/image/Image";
// import "@reach/dialog/styles.css";
// import Img from "gatsby-image";
import styled from "@emotion/styled";
// import styled from "@emotion/styled";
import { useState } from "react";
import { v4 } from "uuid";
// import { Image } from "../Image";
// import PreviewCompatibleImage from "../PreviewCompatibleImage";
import galleryStyles from "./gallery.module.css";

const Heading = styled.h2`
  text-align: center;
`;

const Caption = styled.div`
  font-size: 0.8em;
  text-align: center;
  @media (max-width: 767px) {
    display: none;
  }
`;

const CloseIcon = styled.div`
  cursor: pointer;
  height: 30px;
  position: absolute;
  right: -12px;
  top: -40px;
  width: auto;
  & svg {
    height: 30px;
    width: auto;
  }
  @media (min-width: 768px) {
    right: -26px;
    top: -34px;
  }
`;

export const Gallery = (props) => {
  const { photos } = props;
  const [showLightboxState, setShowLightboxState] = useState(false);

  const [selectedImageState, setSelectedImageState] = useState(0);

  // console.log("photos ", photos);
  // const showLightboxHandler = (event) => {
  //   // console.log("show lightbox");
  //   setShowLightboxState(true);
  // };

  const hideLightboxHandler = (event) => {
    // console.log("hide lightbox");
    setShowLightboxState(false);
  };

  const goBack = () => {
    // console.log("state is " + selectedImageState);
    setSelectedImageState(() => {
      return selectedImageState - 1;
    });
  };

  const goForward = () => {
    // console.log("state is " + selectedImageState);
    setSelectedImageState((prevState) => {
      return selectedImageState + 1;
    });
  };

  const dialogModalStyles = {
    background: "hsla(0, 0%, 0%, 0.84)",
    position: "fixed",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    overflow: "auto",
    zIndex: 1000,
  };
  const dialogContentStyles = {
    background: "white",
    margin: "5vh auto",
    maxWidth: "800px",
    outline: "none",
    padding: "0.5rem",
    width: "95vw",
  };

  return (
    <div className={galleryStyles.container}>
      <div className={galleryStyles.galleryInner}>
        <Heading>Photo updates</Heading>
        <div className={galleryStyles.gallery}>
          {photos
            ? photos.map((photo, i) => (
                <div
                  className={galleryStyles.gridCell}
                  onClick={() => {
                    setShowLightboxState(true);
                    setSelectedImageState(i);
                  }}
                  key={v4()}
                  // onKeyPress={handleKeyPress}
                  role="button"
                  tabIndex={0}
                >
                  <Image
                    image={photo}
                    height={160}
                    maxWidth={280}
                    maxHeight={160}
                    alt={photo.alt}
                    fit="crop"
                  />
                </div>
              ))
            : null}
          {showLightboxState && (
            <DialogOverlay style={dialogModalStyles}>
              <DialogContent style={dialogContentStyles}>
                <div className={galleryStyles.dialogInner}>
                  <Image
                    image={photos[selectedImageState]}
                    maxWidth={800}
                    height={540}
                    alt={photos[selectedImageState].alt}
                  />

                  <Caption>{photos[selectedImageState].caption}</Caption>
                  <CloseIcon>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      onClick={hideLightboxHandler}
                    >
                      <path
                        fill="#fff"
                        d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm121.6 313.1c4.7 4.7 4.7 12.3 0 17L338 377.6c-4.7 4.7-12.3 4.7-17 0L256 312l-65.1 65.6c-4.7 4.7-12.3 4.7-17 0L134.4 338c-4.7-4.7-4.7-12.3 0-17l65.6-65-65.6-65.1c-4.7-4.7-4.7-12.3 0-17l39.6-39.6c4.7-4.7 12.3-4.7 17 0l65 65.7 65.1-65.6c4.7-4.7 12.3-4.7 17 0l39.6 39.6c4.7 4.7 4.7 12.3 0 17L312 256l65.6 65.1z"
                      />
                    </svg>
                  </CloseIcon>
                </div>
                {selectedImageState === 0 ? (
                  <LeftArrow className="disabled" />
                ) : (
                  <LeftArrow onClick={goBack} />
                )}
                {selectedImageState === photos.length - 1 ? (
                  <RightArrow className="disabled" />
                ) : (
                  <RightArrow onClick={goForward} />
                )}
              </DialogContent>
            </DialogOverlay>
          )}
        </div>
      </div>
    </div>
  );
};

const LeftArrow = styled.span`
  border-bottom: 20px solid transparent;
  border-top: 20px solid transparent;
  color: #fff;
  cursor: pointer;
  height: 0;
  position: fixed;
  top: 45%;
  transform: translateY(-50%);
  width: 0;
  &.disabled {
    cursor: default;
    opacity: 0.6;
  }
  border-right: 30px solid #fff;
  left: 30px;
`;

const RightArrow = styled.span`
  border-bottom: 20px solid transparent;
  border-top: 20px solid transparent;
  color: #fff;
  cursor: pointer;
  height: 0;
  position: fixed;
  top: 45%;
  transform: translateY(-50%);
  width: 0;
  &.disabled {
    cursor: default;
    opacity: 0.6;
  }
  border-left: 30px solid #fff;
  right: 30px;
`;
