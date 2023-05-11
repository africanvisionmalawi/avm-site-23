import styled from "@emotion/styled";
// import Img from "gatsby-image";
// import styled from "@emotion/styled";
import { EventDate } from "components/common/EventDate";
import { EventDateFormatted } from "components/events/EventDateFormatted";
import { PortableText } from "components/portable-text/BasePortableText";
import { MoreButton } from "./MoreButton";
import { PhotoCont } from "./PhotoCont";

const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const CardEvent = styled.div`
  display: grid;
  grid-template-columns: 190px 1fr;
  grid-gap: 1.5rem;
  margin-bottom: 2rem;
`;

const DateBox = styled.div`
  background: #246a73;
  color: #fff;
  height: 190px;
  border-radius: 8px;
`;

const Content = styled.div`
  padding: 1rem 1rem 0;
  @media (min-width: 576px) {
    padding: 1rem 3px 0;
  }
`;

const Heading = styled.h3`
  margin-top: 0;
  margin-bottom: 0;
  a:link,
  a:visited {
    color: #246a73;
  }
  a:hover {
    text-decoration: underline;
  }
`;

const SubHeading = styled.div`
  color: #ababad;
  display: block;
  font-size: 0.9rem;
  padding: 0 2px 8px;
`;

export const CardPostAlt = ({
  type = "sanity",
  title,
  excerpt,
  slug,
  publishDate,
  photo,
  date,
  endDate,
  hideTime,
  allDay,
  displayMoreButton,
}) => {
  const baseFolder = type === "event" ? "events" : "news";

  const url = `/${baseFolder}/${slug.current}/`;

  const text =
    type === "sanity" || type === "event" ? (
      <PortableText blocks={excerpt} />
    ) : (
      <div>{excerpt}</div>
    );

  return type === "event" ? (
    <CardEvent>
      {slug ? (
        <>
          <a href={url} className="card-image">
            <DateBox>
              {date && typeof photo === "object" ? (
                <EventDateFormatted
                  date={date}
                  endDate={endDate ? endDate : null}
                  hideTime={hideTime ? hideTime : false}
                  allDay={allDay ? allDay : false}
                />
              ) : null}
            </DateBox>
          </a>
        </>
      ) : date && typeof photo === "object" ? (
        <EventDateFormatted
          date={date}
          endDate={endDate ? endDate : null}
          hideTime={hideTime ? hideTime : false}
          allDay={allDay ? allDay : false}
        />
      ) : null}
      <Content>
        {title ? (
          <Heading>{slug ? <a href={url}>{title}</a> : title}</Heading>
        ) : null}
        {publishDate ? <SubHeading>{publishDate}</SubHeading> : null}
        {excerpt ? text : null}
        {/* TODO: add hideLink here */}
      </Content>
      {url && displayMoreButton ? <MoreButton url={url} /> : null}
    </CardEvent>
  ) : (
    <Card>
      <div>
        {slug ? (
          <>
            <a href={url} className="card-image">
              {photo && typeof photo === "object" ? (
                <PhotoCont photo={photo} photoType="news" />
              ) : null}
            </a>
          </>
        ) : photo && typeof photo === "object" ? (
          <PhotoCont photo={photo} photoType="news" />
        ) : null}
        <Content>
          {title ? (
            <Heading>{slug ? <a href={url}>{title}</a> : title}</Heading>
          ) : null}
          {date ? (
            <EventDate
              date={date}
              endDate={endDate ? endDate : null}
              hideTime={hideTime ? hideTime : false}
              allDay={allDay ? allDay : false}
            />
          ) : null}
          {publishDate ? <SubHeading>{publishDate}</SubHeading> : null}
          {excerpt ? text : null}
          {/* TODO: add hideLink here */}
        </Content>
        {url && displayMoreButton ? <MoreButton url={url} /> : null}
      </div>
    </Card>
  );
};
