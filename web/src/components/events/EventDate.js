import styled from "@emotion/styled";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import PropTypes from "prop-types";
dayjs.extend(advancedFormat);

// todo: tidy up this mess of if satements

export const EventDate = ({ date, endDate, allDay, layout, hideTime }) => {
  let dateString = "";
  let timeString = "";
  let timeStringEnd = "";
  let dateHtml = "";
  if (
    // endDate is either null or at least a day after the start date
    endDate != null &&
    dayjs(endDate, "MMMM DD, YYYY").isAfter(
      dayjs(date).format("MMMM DD, YYYY"),
      "day"
    )
  ) {
    // display the time if we need to
    if (allDay === false && hideTime === false) {
      timeString =
        ", " +
        dayjs(date).format("HH:mm") +
        " to " +
        dayjs(endDate).format("HH:mm");
    }
    dateString =
      dayjs(date).format("Do MMMM ") +
      " to " +
      dayjs(endDate).format("Do MMMM, YYYY") +
      timeString;
  } else {
    if (allDay === false && hideTime === false) {
      if (
        dayjs(endDate, "MMMM DD, YYYY").isAfter(
          dayjs(date).format("MMMM DD, YYYY"),
          "hour"
        )
      ) {
        timeStringEnd = " to " + dayjs(endDate).format("HH:mm");
      }
      timeString = " at " + dayjs(date).format("HH:mm") + timeStringEnd;
    }
    dateString = dayjs(date).format("Do MMMM, YYYY ") + timeString;
  }

  EventDate.propTypes = {
    date: PropTypes.string,
    endDate: PropTypes.string,
  };

  if (layout) {
    if (layout === "card") {
      dateHtml = <Notice>{dateString}</Notice>;
    } else {
      dateHtml = <DatesHeading>Dates: {dateString}</DatesHeading>;
    }
  } else {
    dateHtml = <DatesSubHeading>Dates: {dateString}</DatesSubHeading>;
  }

  return dateHtml;
};

const Notice = styled.div`
  background: #fff;
  border: 1px solid #c07d44;
  border-radius: 8px;
  color: #c07d44;
  font-size: 1.2em;
  padding: 12px;
  text-align: center;
  width: 300px;
`;

const DatesSubHeading = styled.div`
  color: #ababad;
  font-size: 0.9rem;
`;

const DatesHeading = styled.div`
  color: #000;
  font-size: 1.2rem;
  font-weight: bold;
`;

export default EventDate;
