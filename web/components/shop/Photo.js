import { Image } from "components/common/image/Image";

export const Photo = (props) => {
  // console.log("props inside photo ", props);
  const { photo, photoType } = props;
  const photoSizes = {
    default: {
      w: 280,
      h: 280,
    },
    featured: {
      w: 600,
      h: 600,
    },
  };

  return (
    <>
      {photo ? (
        <Image
          image={photo}
          maxWidth={photoSizes[photoType].w}
          maxHeight={photoSizes[photoType].h}
          alt={photo.alt}
          fit="clip"
          style={{
            width: "100%",
            height: "auto",
            // objectFit: "clip",
          }}
        />
      ) : null}
    </>
  );
};
