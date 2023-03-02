import styled from "@emotion/styled";
import React, { useCallback, useEffect, useRef } from "react";
import Slider from "react-slick";
import { Photo } from "../shop/Photo";

const SliderStyles = styled(Slider)`
  box-sizing: border-box;
  display: block;
  height: 100%;
  position: relative;
  touch-action: pan-y;
  user-select: none;
  & div {
    height: 100%;
  }
  & .slick-list {
    overflow: hidden;
  }
  & .slick-slide {
    float: left;
  }
  & .slick-arrow {
    position: absolute;
    top: 45%;
    display: block;
    width: 50px;
    height: 50px;
    background-position: center;
    background-repeat: no-repeat;
    cursor: pointer;
    border: 1px solid #dbdbdb;
    text-indent: -1000em;
    background-color: white;
    border-radius: 50%;
    z-index: 100;
  }

  & .slick-prev {
    left: -20px;
    background-image: url("data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgNzUgMTIwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMiIgaGVpZ2h0PSIxOCI+PHBhdGggZD0iTTYwIDBsMTUgMTUtNDUgNDUgNDUgNDUtMTUgMTVMMCA2MCIgZmlsbD0iI0U3NzQ1QyIvPjwvc3ZnPg==");
  }

  & .slick-next {
    right: -20px;
    background-image: url("data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgNzUgMTIwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMiIgaGVpZ2h0PSIxOCI+PHBhdGggZD0iTTE1IDBMMCAxNWw0NSA0NS00NSA0NSAxNSAxNSA2MC02MCIgZmlsbD0iI0U3NzQ1QyIvPjwvc3ZnPg==");
  }
`;

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
    <SliderStyles
      ref={sliderRef}
      autoplay={true}
      afterChange={onSlideChange}
      arrows={true}
      className="gallery"
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
    </SliderStyles>
  );
});
