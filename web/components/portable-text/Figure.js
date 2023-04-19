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
        layout="responsive"
        style={{
          objectFit: "cover",
          height: "auto",
          maxWidth: "80vw",
        }}
        sizes="(max-width: 767px) 95vw, (max-width: 940px) 80vw, 756px"
        fit="crop"
      />
      <figcaption>{caption}</figcaption>
    </figure>
  );
};
