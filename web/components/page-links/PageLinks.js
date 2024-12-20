import styled from "@emotion/styled";
import { getFeaturedLinks } from "lib/helpers";
import React from "react";
// import { CardDouble } from "../card/CardDouble";
import { CardSingle } from "components/card/CardSingle";
import styles from "components/page-links/pageLinks.module.css";

const Heading = styled.h2`
  text-align: center;
`;

const PageLinksWithPhotos = ({ pageLinks }) => {
  return (
    <>
      {pageLinks.length
        ? pageLinks.map((pageLink) => {
            // console.log(
            //   "category ",
            //   pageLink.linkTitle,
            //   pageLink.url?.category
            // );
            const categoryUrl = pageLink.url?.category?.slug?.current
              ? `${pageLink.url.category.slug.current}/`
              : "";
            // console.log("link here ", pageLink.linkTitle, categoryUrl);
            const pageUrl = pageLink?.url?.slug?.current
              ? `${pageLink.url.slug.current}`
              : "";
            const url =
              categoryUrl === pageUrl
                ? `/${pageUrl}`
                : `/${categoryUrl}${pageUrl}`;
            // console.log("link here ", pageLink.linkTitle, url);
            return (
              <React.Fragment key={pageLink.id}>
                {!pageLink.hideLink &&
                (pageLink.extUrl || (url && url !== "/")) ? (
                  <>
                    <CardSingle
                      url={url}
                      extUrl={pageLink.extUrl ? pageLink.extUrl : null}
                      title={pageLink.linkTitle ? pageLink.linkTitle : null}
                      linkText={pageLink.linkText ? pageLink.linkText : null}
                      fixed={pageLink?.photo?.asset?.fixed || null}
                      photo={pageLink.photo ? pageLink.photo : null}
                      featured={pageLink.featured ? pageLink.featured : false}
                      // showPageLink={pageLink.showPageLink}
                      // hideOtherPhotos={pageLink.hideOtherPhotos}
                    />
                  </>
                ) : null}
              </React.Fragment>
            );
          })
        : null}
    </>
  );
};

export const PageLinks = ({
  pageLinks,
  displayHeading,
  heading,
  showPageLink,
  hideOtherPhotos,
}) => {
  const featuredLinks = pageLinks ? getFeaturedLinks(pageLinks, true) : null;
  const otherLinks = pageLinks ? getFeaturedLinks(pageLinks, false) : undefined;

  return (
    <div>
      {displayHeading ? <Heading>{heading}</Heading> : null}
      {featuredLinks.length ? (
        <div className={styles.cardContWide}>
          <PageLinksWithPhotos pageLinks={featuredLinks} />
        </div>
      ) : null}
      {otherLinks?.length ? (
        <div className={styles.cardCont}>
          <PageLinksWithPhotos pageLinks={otherLinks} />
        </div>
      ) : null}
    </div>
  );
};
