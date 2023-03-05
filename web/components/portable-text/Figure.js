import { Image } from "components/common/image/Image";

export default ({ value }) => {
  // console.log("value ", value);
  const { _key, alt, asset, caption } = value;

  if (!asset) return null;

  return (
    <figure>
      <Image
        image={value}
        alt={alt}
        maxWidth={1180}
        style={{
          objectFit: "cover",
          height: "auto",
          maxWidth: "100vw",
        }}
        sizes="(max-width: 1140px) 100vw, 1140px"
        fit="crop"
      />
      <figcaption>{caption}</figcaption>
    </figure>
  );
};
