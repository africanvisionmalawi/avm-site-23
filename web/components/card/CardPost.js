// import Img from "gatsby-image";
// import { EventDate } from "../events/EventDate";
import { CardContent } from "./CardContent";
import { PhotoCont } from "./PhotoCont";

export const CardPost = ({ post }) => {
  // console.log("cardpost *******", post);
  const { slug, title, excerpt, body, photo } = post;
  const url = `/news/${slug.current}/`;

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
