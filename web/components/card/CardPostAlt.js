import { EventDate } from "components/common/EventDate";
import { PortableText } from "components/portable-text/BasePortableText";
import { MoreButton } from "./MoreButton";
import { PhotoCont } from "./PhotoCont";
import styles from "./card.module.css";

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

  const url = `/${baseFolder}/${slug.current}`;

  const text =
    type === "sanity" || type === "event" ? (
      <PortableText blocks={excerpt} />
    ) : (
      <div>{excerpt}</div>
    );

  return (
    <div className={styles.postCard}>
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
        <div className={styles.postContent}>
          {title ? (
            <h3 className={styles.postHeading}>
              {slug ? <a href={url}>{title}</a> : title}
            </h3>
          ) : null}
          {date ? (
            <EventDate
              date={date}
              endDate={endDate ? endDate : null}
              hideTime={hideTime ? hideTime : false}
              allDay={allDay ? allDay : false}
            />
          ) : null}
          {publishDate ? (
            <div className={styles.postHeading}>{publishDate}</div>
          ) : null}
          {excerpt ? text : null}
          {/* TODO: add hideLink here */}
        </div>
        {url && displayMoreButton ? <MoreButton url={url} /> : null}
      </div>
    </div>
  );
};
