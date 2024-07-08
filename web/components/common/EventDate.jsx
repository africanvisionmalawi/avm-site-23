import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import PropTypes from "prop-types";
import styles from "./eventDate.module.css";
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
      dateHtml = <div className={styles.notice}>{dateString}</div>;
    } else {
      dateHtml = <div className={styles.heading}>Dates: {dateString}</div>;
    }
  } else {
    dateHtml = <div className={styles.subHeading}>Dates: {dateString}</div>;
  }

  return dateHtml;
};

export default EventDate;
