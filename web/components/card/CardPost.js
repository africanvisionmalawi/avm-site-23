// import Img from "gatsby-image";
// import { EventDate } from "../events/EventDate";
import { CardContent } from "./CardContent";
import { PhotoCont } from "./PhotoCont";

export const CardPost = ({ post }) => {
  // console.log("cardpost *******", post);
  const { slug, title, excerpt, photo } = post;
  const url = slug?.current ? `/news/${slug.current}` : null;

  return (
    <div>
      {slug ? (
        <>
          <a href={url} className="card-image">
            {photo ? <PhotoCont photo={photo} photoType="news" /> : null}
          </a>
        </>
      ) : photo ? (
        <PhotoCont photo={photo} photoType="news" />
      ) : null}

      <CardContent title={title} linkText={excerpt} url={url} />
    </div>
  );
};
