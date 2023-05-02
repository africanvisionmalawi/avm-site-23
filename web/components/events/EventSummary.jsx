import styled from "@emotion/styled";
// import { Image } from "components/common/image/Image";
import { EventDate } from "components/events/EventDate";

const EventDetails = styled.ul`
  background: #f7f7f7;
  border-radius: 8px;
  margin-bottom: 1rem;
  padding: 16px;
  &,
  & li {
    list-style-type: none;
  }
`;

export const EventSummary = ({ data, displayTitle, displayLink }) => {
  //   console.log("data ", data);
  return (
    <EventDetails>
      {displayTitle && data.title ? <li>{data.title}</li> : null}
      <li>
        <EventDate
          date={data.date}
          endDate={data.endDate}
          hideTime={data.hideTime}
          allDay={data.allDay}
          layout="mainHeading"
        />
      </li>
      {data.location ? <li>Location: {data.location}</li> : null}
      {data.contact ? <li>Contact: {data.contact}</li> : null}
      {data.telephone ? <li>Telephone: {data.telephone}</li> : null}
      {data.cost ? <li>&pound;{data.cost}</li> : null}
      {displayLink && data.slug.current ? (
        <li>
          <a href={`/events/${data.slug.current}`}>More Info -&gt;</a>
        </li>
      ) : null}
    </EventDetails>
  );
};
