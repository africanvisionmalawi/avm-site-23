import imageUrlBuilder from "@sanity/image-url";
import sanityClient from "client.js";
import { getImageDimensions } from "components/common/image/getImageDimensions";

export const imageBuilder = imageUrlBuilder(sanityClient);

const LARGEST_VIEWPORT = 1920; // Retina sizes will take care of 4k (2560px) and other huge screens

const DEFAULT_MIN_STEP = 0.1; // 10%
const DEFAULT_WIDTH_STEPS = [300, 580, 768, 1000, 1150]; // arbitrary
// Based on statcounter's most common screen sizes: https://gs.statcounter.com/screen-resolution-stats
const DEFAULT_FULL_WIDTH_STEPS = [360, 414, 768, 1366, 1536, 1920];

export const getImageProps = ({
  /**
   * The image's reference object.
   * Example: {asset: {_ref: string}, hotspot: {...}, crop: {...} }
   */
  image,

  // Number of the largest width it can assume in the design
  // or "100vw" if it occupies the whole width
  maxWidth: userMaxWidth,

  /**
   * The minimal width difference, in PERCENTAGE (decimal), between the image's srcSet variations.
   *
   * -> 0.10 (10%) by default.
   */
  minimumWidthStep = DEFAULT_MIN_STEP,

  // List of width sizes to use in the srcSet (NON-RETINA)
  customWidthSteps,

  // Custom <img> element's `sizes` attribute
  sizes,

  maxHeight,
  fit = "max",
  layout,
}) => {
  if (!image?.asset?._ref && !image?.asset?._id) {
    return {};
  }
  const maxWidth =
    typeof userMaxWidth === "number" ? userMaxWidth : LARGEST_VIEWPORT;

  // For all image variations, we'll use an auto format and prevent scaling it over its max dimensions
  const builder = imageBuilder
    .image(image)
    .fit(fit)
    .auto("format");

  const imageDimensions = getImageDimensions(image);

  // Width sizes the image could assume
  const baseSizes = [
    maxWidth,
    ...(customWidthSteps ||
      (typeof userMaxWidth === "number"
        ? DEFAULT_WIDTH_STEPS
        : DEFAULT_FULL_WIDTH_STEPS)),
  ];
  const retinaSizes = Array.from(
    // De-duplicate sizes with a Set
    new Set([
      ...baseSizes,
      ...baseSizes.map((size) => size * 2),
      ...baseSizes.map((size) => size * 3),
    ])
  )
    .sort((a, b) => a - b) // Lowest to highest
    .filter(
      (size) =>
        // Exclude sizes 10% or more larger than the image itself. Sizes slightly larger
        // than the image are included to ensure we always get closest to the highest
        // quality for an image. Sanity's CDN won't scale the image above its limits.
        size <= imageDimensions.width * 1.1 &&
        // Exclude those larger than maxWidth's retina (x3)
        size <= maxWidth * 3
    )

    // Exclude those with a value difference to their following size smaller than `minimumWidthStep`
    // This ensures we don't have too many srcSet variations, polluting the HTML
    .filter((size, i, arr) => {
      const nextSize = arr[i + 1];
      if (nextSize) {
        return nextSize / size > minimumWidthStep + 1;
      }

      return true;
    });

  // console.log("sizes ", sizes);
  // console.log(
  //   "srcset ",
  //   retinaSizes
  //     .map((size) => `${builder.width(size).url()} ${size}w`)
  //     .join(", ")
  // );

  return {
    // Use the original image as the `src` for the <img>
    src: builder
      .width(maxWidth)
      .height(maxHeight)
      .url(),

    // Build a `{URL} {SIZE}w, ...` string for the srcset
    srcSet:
      layout === "fixed"
        ? null
        : retinaSizes
            .map((size) => `${builder.width(size).url()} ${size}w`)
            .join(", "),
    sizes:
      maxWidth === "100vw"
        ? "100vw"
        : sizes || `(max-width: ${maxWidth}px) 100vw, ${maxWidth}px`,

    // Let's also tell the browser what's the size of the image so it can calculate aspect ratios
    width: layout === "fixed" ? maxWidth : null,
    // height: retinaSizes[0] / imageDimensions.aspectRatio,
    height: layout === "fixed" ? maxHeight : null,
    // : retinaSizes[0] / imageDimensions.aspectRatio,
  };
};
