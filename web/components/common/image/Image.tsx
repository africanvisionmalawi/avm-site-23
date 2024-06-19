import { default as NextImage } from "next/image";
import { imageBuilder } from "./getImageProps";
// const builder = imageUrlBuilder(sanityClient);

// function urlFor(source) {
//   return builder.image(source);
// }

const imageSizes = {
  hero: {
    width: "100%",
    height: 300,
  },
};

export const Image = ({
  image,
  height,
  width,
  maxWidth,
  maxHeight,
  fit = "max",
  // sizes = "100vw",
  alt = "",
  priority,
  imageSize,
  layout = "fixed",
  style,
  sizes,
}) => {
  if (!image) return;

  console.log("image ", image);
  const builder = imageBuilder
    .image(image)
    .fit(fit)
    .auto("format");

  // const imageUrl =
  //   image &&
  //   urlFor(image)
  //     ?.height(height)
  //     .width(width)
  //     .fit("crop")
  //     .auto("format")
  //     .quality(40)
  //     .url();
  // console.log("fit ", fit);
  // console.log("maxWidth ", maxWidth ? maxWidth : "no max width");
  // const { src, srcset, sizes, width, height } = getImageProps({
  //   image,
  //   maxWidth,
  // });
  // console.log("imageUrl ", imageUrl);
  return (
    <>
      {image ? (
        <NextImage
        alt={alt}
          src={builder
            .width(maxWidth)
            .height(maxHeight)
            .url()}
          // baseUrl="https://cdn.sanity.io/images/hh4wbbfo/production/"
          height={maxHeight}
          sizes={sizes}
          width={maxWidth}
        />
      ) : // <img
      //   style={{
      //     ...style,
      //   }} // could be a global style
      //   loading={priority && priority === "eager" ? "eager" : "lazy"}
      //   alt={image.alt || " "}
      //   {
      //     // Pass src, srcset, width, height and sizes to the image element
      //     ...getImageProps({
      //       image,
      //       maxWidth,
      //       maxHeight,
      //       imageSize,
      //       fit,
      //       layout,
      //       sizes,
      //     })
      //   }
      // />
      null}
    </>
  );
};
