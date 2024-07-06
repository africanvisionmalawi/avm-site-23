import styles from "carousel.module.css";
import React, { useCallback, useEffect, useRef } from "react";
import { Photo } from "../shop/Photo";

const AUTOPLAY_INTERVAL = 1500;

export const Carousel = React.memo((props) => {
  const { activeIndex, allSizesImages, photoType } = props;

  // set the slider and timer refs
  const sliderRef = useRef();
  const autoplayInterval = useRef(false);

  const autoplayNext = useCallback(() => {
    sliderRef && sliderRef.current.slickNext();
  }, []);

  useEffect(() => {
    // animate the slider when props.isAnimating prop is changed
    if (props.isAnimating) {
      autoplayInterval.current = setInterval(() => {
        autoplayNext();
      }, AUTOPLAY_INTERVAL);
    }
    return () => clearInterval(autoplayInterval.current);
  }, [props.isAnimating, autoplayNext]);

  const onSlideChange = (index) => {
    props.onSlideChange && props.onSlideChange(index);
  };

  return (
    <div
      ref={sliderRef}
      autoplay={true}
      afterChange={onSlideChange}
      arrows={true}
      className={`gallery ${styles.slider}`}
      infinite={allSizesImages.length > 1}
      initialSlide={activeIndex || 0}
      dots="true"
    >
      {allSizesImages.photos.length ? (
        allSizesImages.photos.map((photo, i) => (
          <div key={photo._key}>
            <Photo photo={photo} photoType={photoType} />
          </div>
        ))
      ) : (
        <div />
      )}
    </div>
  );
});
