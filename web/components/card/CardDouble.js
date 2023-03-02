import styled from "@emotion/styled";
import { Link } from "gatsby";
import Img from "gatsby-image";
import { EventDate } from "../../src/components/events/EventDate";
import { CardContent } from "./CardContent";

const ImageCont = styled.div`
  border-radius: 4px;
  margin: 0;
  position: relative;
`;

const EventDateCont = styled.div`
  bottom: 12px;
  left: calc(50% - 150px);
  position: absolute;
  z-index: 5;
`;

// const Btn = styled.div`
//   border: 1px solid #f99d1c;
//   border-radius: 4px;
//   color: #f99d1c;
//   display: block;
//   padding: 8px;
//   text-align: center;
// `;

export const CardDouble = ({ url, extUrl, title, linkText, fixed, photo }) => {
  let cardImage;
  if (props.largeImage) {
    // console.log("largeimage", props.largeImage);
    cardImage = (
      <Img
        fluid={props.largeImage.childImageSharp.fluid}
        alt=""
        imgStyle={{ objectFit: "contain" }}
        backgroundColor={true}
        objectFit="contain"
      />
    );
  } else {
    cardImage = <img src="/img/default/default-landscape.jpg" alt="" />;
  }

  return (
    <div>
      {props.url && (
        <Link to={props.url} className="card-image">
          <ImageCont>
            {props.displayDate && (
              <EventDateCont>
                <EventDate
                  date={props.date}
                  endDate={props.endDate}
                  layout="card"
                />
              </EventDateCont>
            )}
            {cardImage}
          </ImageCont>
        </Link>
      )}
      <CardContent
        title={props.title}
        displayLocation={props.displayLocation}
        location={props.location}
        linkText={props.linkText}
        showPageLink={props.showPageLink}
        url={props.url}
      />
    </div>
  );
};
