import { Image } from "components/common/image/Image";

export default ({ value }) => {
  // console.log("value ", value);
  const { _key, alt, asset, caption } = value;

  if (!asset) return null;

  return (
    <figure>
      <Image image={value} alt={alt} maxWidth={800} />
      <figcaption>{caption}</figcaption>
    </figure>
  );
};
