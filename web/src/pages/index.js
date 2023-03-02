import { graphql } from "gatsby";
import React from "react";
import Errors from "../components/errors";
import HomePage from "../templates/homePage";

export const query = graphql`
  query HomePageTemplateQuery {
    homeQuery: sanityHomePage {
      id
      title
      description
      subTitle
      indexPage
      _rawIntroText(resolveReferences: { maxDepth: 10 })
      introText {
        _key
      }
      latestNews {
        _key
      }
      _rawLatestNews(resolveReferences: { maxDepth: 10 })
      promoVideo {
        _key
        text
        url
      }
      hero {
        image {
          asset {
            fluid(maxWidth: 1918, maxHeight: 540) {
              ...GatsbySanityImageFluid
            }
          }
          hotspot {
            _key
            _type
            height
            width
            x
            y
          }
          asset {
            _id
          }
          alt
          caption
          crop {
            _key
            _type
            bottom
            left
            right
            top
          }
        }
      }
      newsLinks {
        newsLinks {
          url {
            id
            title
            slug {
              current
            }
            photo {
              alt
              ...ImageWithPreview
            }
            _rawExcerpt(resolveReferences: { maxDepth: 10 })
          }
        }
      }
    }
    homeEventsAll: allSanityEvent(
      filter: { slug: { current: { ne: null } } }
      sort: { order: DESC, fields: date }
      limit: 3
    ) {
      edges {
        node {
          id
          title
          slug {
            current
          }
          _rawExcerpt(resolveReferences: { maxDepth: 10 })
          location
          url
          date
          endDate
          allDay
          hideTime
          featured_image {
            _key
            ...ImageWithPreview
          }
        }
      }
    }
    ourWork: allSanityOurWorkShared {
      edges {
        node {
          ourWork {
            _key
            title
            photo {
              alt
              ...ImageWithPreview
            }
            _rawBody(resolveReferences: { maxDepth: 10 })
            slug {
              current
            }
          }
        }
      }
    }
  }
`;

const IndexPage = (props) => {
  const { data, errors } = props;

  if (errors) {
    return <Errors errors={errors} />;
  }

  return <HomePage data={data} />;
};

export default IndexPage;
