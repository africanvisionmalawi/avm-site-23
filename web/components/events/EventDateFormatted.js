import styled from "@emotion/styled";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
dayjs.extend(advancedFormat);

// todo: tidy up this mess of if satements

export const EventDateFormatted = ({
  date,
  endDate,
  allDay,
  layout,
  hideTime,
}) => {
  let dateString = "";
  let timeString = "";
  let timeStringEnd = "";
  let dateHtml = "";
  let day1 = "";
  let day2 = "";
  let month1 = "";
  let month2 = "";

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
    day1 = dayjs(date).format("Do");
    day2 = dayjs(endDate).format("Do");
    month1 = dayjs(date).format("MMMM");
    month2 = dayjs(endDate).format("MMMM");
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
    day1 = dayjs(date).format("Do");
    month1 = dayjs(date).format("MMMM");
  }

  if (layout) {
    if (layout === "card") {
      dateHtml = <Notice>{dateString}</Notice>;
    } else {
      dateHtml = <DatesHeading>{dateString}</DatesHeading>;
    }
  } else {
    dateHtml = (
      <DatesGrid>
        <DatesContainer>
          <Month>{month1}</Month>
          <Day>
            {day1}{" "}
            {endDate != null &&
            dayjs(endDate, "MMMM DD, YYYY").isAfter(
              dayjs(date).format("MMMM DD, YYYY"),
              "day"
            )
              ? " - " + day2
              : null}{" "}
          </Day>
        </DatesContainer>
        {/* {endDate != null &&
        dayjs(endDate, "MMMM DD, YYYY").isAfter(
          dayjs(date).format("MMMM DD, YYYY"),
          "day"
        ) ? (
          <DatesContainer>
            <Day>{day2}</Day>
            <Month>{month2}</Month>
          </DatesContainer>
        ) : null} */}
      </DatesGrid>
    );
  }

  return dateHtml;
};

const DatesGrid = styled.div`
  display: grid;
  font-family: var(--font-raleway);
  grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
  grid-gap: 0.5rem;
  height: 190px;
`;

const DatesContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const Day = styled.div`
  font-size: 2rem;
`;

const Month = styled.div`
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  background: #65969c;
  padding: 0.5rem 0;
  text-align: center;
  width: 100%;
  font-size: 2.5rem;
`;

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
