import { default as NextImage } from "next/image";
import { imageBuilder } from "./getImageProps";
// const builder = imageUrlBuilder(sanityClient);

function urlFor(source) {
  return imageBuilder.image(source).auto("format");;
}

const imageSizes = {
  hero: {
    width: "100%",
    height: 300,
  },
};

export const Image = ({
  className,
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
  fill = false,
  quality = 60
}) => {
  if (!image) return;

  // console.log("image ", image);
  const imageUrl = urlFor(image).width(maxWidth).height(maxHeight).dpr(2).quality(60).url()
  const blurUrl = urlFor(image).width(5).quality(5).url() // Low-quality blurred image
  // console.log("image blurred ", image.metadata);
  // const builder = imageBuilder
  //   .image(image)
  //   .fit(fit)
  //   .auto("format");

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
        className={className || '' }
          src={imageUrl}
          // baseUrl="https://cdn.sanity.io/images/hh4wbbfo/production/"
          height={!fill ? maxHeight : undefined}
          sizes={sizes}
          width={!fill ? maxWidth : undefined}
          blurDataURL={blurUrl}
          fill={fill}
          priority={priority}
          style={style}
          quality={quality}
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
