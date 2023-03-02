import { Image } from "components/common/image/Image";
// const ImageCont = styled.div`
//   margin: 0;
//   position: relative;
// `;

// const EventDateCont = styled.div`
//   bottom: 12px;
//   left: calc(50% - 150px);
//   position: absolute;
//   z-index: 100;
// `;

export const PhotoCont = (props) => {
  const { photo, photoType } = props;
  // console.log("photo ", photoType, photo);
  const photoSizes = {
    default: {
      w: 280,
      h: 125,
      cssW: "280px",
    },
    featured: {
      w: 560,
      h: 280,
    },
    news: {
      w: 371,
      h: 222,
    },
    event: {
      w: 371,
      h: 222,
    },
    ourWork: {
      w: 381,
      h: 240,
      sizes: "(max-width: 480px) 100vw, 480px",
    },
    shop: {
      w: 600,
      h: 600,
    },
  };
  return (
    <>
      {/* {props.displayDate && (
                <EventDateCont>
                  <EventDate
                    date={props.date}
                    endDate={props.endDate}
                    layout="card"
                  />
                </EventDateCont>
              )} */}
      {photo ? (
        <Image
          image={photo}
          width={photoSizes[photoType].w}
          height={photoSizes[photoType].h}
          maxWidth={photoSizes[photoType].w}
          maxHeight={photoSizes[photoType].h}
          alt={photo.alt}
          style={{
            width: photoSizes[photoType].cssW
              ? photoSizes[photoType].cssW
              : "100%",
            height: "auto",
            objectFit: "cover",
          }}
          sizes={
            photoSizes[photoType].sizes ? photoSizes[photoType].sizes : "unset"
          }
        />
      ) : // <SanityImage
      //   {...photo}
      //   width={photoSizes[photoType].w}
      //   height={photoSizes[photoType].h}
      //   alt={photo.alt}
      //   style={{
      //     width: photoSizes[photoType].cssW
      //       ? photoSizes[photoType].cssW
      //       : "100%",
      //     height: "auto",
      //     objectFit: "cover",
      //   }}
      //   sizes={
      //     photoSizes[photoType].sizes ? photoSizes[photoType].sizes : "unset"
      //   }
      // />
      null}
    </>
  );
};
