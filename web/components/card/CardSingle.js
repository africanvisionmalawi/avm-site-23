import { CardContent } from "./CardContent";
import { PhotoCont } from "./PhotoCont";

export const CardSingle = ({
  url,
  extUrl,
  title,
  linkText,
  fixed,
  photo,
  featured,
}) => {
  // let cardImage;
  // console.log("linkText ", linkText);
  // const hideOtherPhotos = false;
  const photoType = featured ? "featured" : "default";
  // console.log("url ****", url);

  // if (props.smallImage) {
  //   // console.log("smallImage", props.smallImage);
  //   cardImage = <Img fixed={props.smallImage.childImageSharp.fixed} alt="" />;
  // } else {
  //   cardImage = <img src="/img/default/default-landscape.jpg" alt="" />;
  // }
  // const pageUrl = url.category.slug.current;
  // const pageTitle = url.category.title;
  // console.log("linkText ", linkText);
  // console.log("photo ", photo);
  return (
    <div>
      {(url || extUrl) && photo ? (
        <>
          {url ? (
            <a href={url} className="card-image">
              <PhotoCont photo={photo} photoType={photoType} />
            </a>
          ) : (
            <a href={extUrl} className="card-image">
              <PhotoCont photo={photo} photoType={photoType} />
            </a>
          )}
        </>
      ) : (
        <PhotoCont photo={photo} photoType={photoType} />
      )}

      <CardContent
        title={title ? title : null}
        // displayLocation={props.displayLocation}
        // location={props.location}
        linkText={linkText ? linkText : null}
        // showPageLink={props.showPageLink}
        url={extUrl ? extUrl : url ? url : null}
      />
    </div>
  );
};
