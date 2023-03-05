// import BackgroundImage from "gatsby-background-image";
// import { graphql, Link, useStaticQuery } from "gatsby";
import styled from "@emotion/styled";

export const OurWorkTiles = ({ currentProject, displayHeading }) => {
  // const featuredImage = useStaticQuery(
  //   graphql`
  //     query {
  //       PhotoVillageDesktop: file(
  //         relativePath: { eq: "mainphoto_village-ver3.jpg" }
  //       ) {
  //         ...photoTileFixedLgRect
  //       }
  //       PhotoVillageMobile: file(
  //         relativePath: { eq: "mainphoto_village-ver3.jpg" }
  //       ) {
  //         ...photoTileFixedMdRect
  //       }
  //       PhotoWater: file(relativePath: { eq: "mainphoto_water.jpg" }) {
  //         ...photoTileFixedMdRect
  //       }
  //       PhotoHealth: file(relativePath: { eq: "mainphoto_health.jpg" }) {
  //         ...photoTileFixedMdRect
  //       }
  //       PhotoEducationDesktop: file(
  //         relativePath: { eq: "mainphoto_education.jpg" }
  //       ) {
  //         ...photoTileFixedLgRect
  //       }
  //       PhotoEducationMobile: file(
  //         relativePath: { eq: "mainphoto_education.jpg" }
  //       ) {
  //         ...photoTileFixedMdRect
  //       }
  //       PhotoEnvironment: file(
  //         relativePath: { eq: "mainphoto_environment.jpg" }
  //       ) {
  //         ...photoTileFixedMdRect
  //       }
  //       PhotoCelebrate: file(relativePath: { eq: "mainphoto_celebrate.jpg" }) {
  //         ...photoTileFixedMdRect
  //       }
  //     }
  //   `
  // );

  return (
    <Container>
      <div>
        {displayHeading === true ? <Heading>Our work</Heading> : ""}
        <TileCont>
          {projects.map((project) => (
            <Tile
              className={project.fullWidth ? "fullWidth" : "halfSize"}
              key={project.id}
            >
              <a href={project.src} className={project.id}>
                <Overlay>
                  <SubHeading>
                    {project.name} {project.fullWidth}
                  </SubHeading>
                </Overlay>
                {/* <picture>
                  <source
                    type="image/webp"
                    media="(min-width: 576px)"
                    srcset="/static/d085284b2474ab03be045a7b311a1c3d/626c1/mainphoto_village-ver3.webp 245w,
/static/d085284b2474ab03be045a7b311a1c3d/9dacf/mainphoto_village-ver3.webp 490w,
/static/d085284b2474ab03be045a7b311a1c3d/a54f6/mainphoto_village-ver3.webp 980w,
/static/d085284b2474ab03be045a7b311a1c3d/b0da7/mainphoto_village-ver3.webp 1140w"
                    sizes="(max-width: 980px) 100vw, 980px"
                  />
                  <source
                    media="(min-width: 576px)"
                    srcset="/static/d085284b2474ab03be045a7b311a1c3d/e2305/mainphoto_village-ver3.jpg 245w,
/static/d085284b2474ab03be045a7b311a1c3d/45f69/mainphoto_village-ver3.jpg 490w,
/static/d085284b2474ab03be045a7b311a1c3d/fe322/mainphoto_village-ver3.jpg 980w,
/static/d085284b2474ab03be045a7b311a1c3d/d5ea2/mainphoto_village-ver3.jpg 1140w"
                    sizes="(max-width: 980px) 100vw, 980px"
                  />
                  <source
                    type="image/webp"
                    srcset="/static/d085284b2474ab03be045a7b311a1c3d/ec243/mainphoto_village-ver3.webp 120w,
/static/d085284b2474ab03be045a7b311a1c3d/1c752/mainphoto_village-ver3.webp 240w,
/static/d085284b2474ab03be045a7b311a1c3d/3799f/mainphoto_village-ver3.webp 480w,
/static/d085284b2474ab03be045a7b311a1c3d/223e8/mainphoto_village-ver3.webp 720w,
/static/d085284b2474ab03be045a7b311a1c3d/5c4e3/mainphoto_village-ver3.webp 960w,
/static/d085284b2474ab03be045a7b311a1c3d/86038/mainphoto_village-ver3.webp 1140w"
                    sizes="(max-width: 480px) 100vw, 480px"
                  />
                  <source
                    srcset="/static/d085284b2474ab03be045a7b311a1c3d/3c294/mainphoto_village-ver3.jpg 120w,
/static/d085284b2474ab03be045a7b311a1c3d/d8d74/mainphoto_village-ver3.jpg 240w,
/static/d085284b2474ab03be045a7b311a1c3d/a58c7/mainphoto_village-ver3.jpg 480w,
/static/d085284b2474ab03be045a7b311a1c3d/fe031/mainphoto_village-ver3.jpg 720w,
/static/d085284b2474ab03be045a7b311a1c3d/3c58a/mainphoto_village-ver3.jpg 960w,
/static/d085284b2474ab03be045a7b311a1c3d/6a999/mainphoto_village-ver3.jpg 1140w"
                    sizes="(max-width: 480px) 100vw, 480px"
                  />
                  <img
                    sizes="(max-width: 980px) 100vw, 980px"
                    srcset="/static/d085284b2474ab03be045a7b311a1c3d/e2305/mainphoto_village-ver3.jpg 245w,
/static/d085284b2474ab03be045a7b311a1c3d/45f69/mainphoto_village-ver3.jpg 490w,
/static/d085284b2474ab03be045a7b311a1c3d/fe322/mainphoto_village-ver3.jpg 980w,
/static/d085284b2474ab03be045a7b311a1c3d/d5ea2/mainphoto_village-ver3.jpg 1140w"
                    src="/static/d085284b2474ab03be045a7b311a1c3d/fe322/mainphoto_village-ver3.jpg"
                    alt=""
                    loading="lazy"
                    style="position: absolute; top: 0px; left: 0px; width: 100%; height: 100%; object-fit: contain; object-position: center center; opacity: 1; transition: opacity 500ms ease 0s;"
                  />
                </picture> */}
                {/* <Img
                  fluid={
                    project.hasMobileImage === true
                      ? [
                          featuredImage[project.imageIdMobile].childImageSharp
                            .fluid,
                          {
                            ...featuredImage[project.imageIdDesktop]
                              .childImageSharp.fluid,
                            media: `(min-width: 576px)`,
                          },
                        ]
                      : featuredImage[project.imageId].childImageSharp.fluid
                  }
                  alt=""
                  imgStyle={{ objectFit: "contain" }}
                /> */}
              </a>
            </Tile>
          ))}
        </TileCont>
      </div>
    </Container>
  );
};

// FeaturedProjects.propTypes = {
//   currentProject: PropTypes.string,
//   displayHeading: PropTypes.bool,
// };

const projects = [
  {
    id: "village",
    name: "Sam's Village",
    src: "/sams-village/",
    imageIdDesktop: "PhotoVillageDesktop",
    imageIdMobile: "PhotoVillageMobile",
    imgSrcDesktop: "mainphoto_village-ver3",
    colWidth: {
      base: "100%",
      md: "100%",
    },
    fullWidth: true,
    hasMobileImage: true,
  },
  {
    id: "water",
    name: "Water",
    src: "/water/",
    imageId: "PhotoWater",
    colWidth: {
      base: "100%",
      md: "50%",
    },
    fullWidth: false,
    hasMobileImage: false,
  },
  {
    id: "health",
    name: "Health",
    src: "/health/",
    imageId: "PhotoHealth",
    colWidth: {
      base: "100%",
      md: "50%",
    },
    fullWidth: false,
    hasMobileImage: false,
  },
  {
    id: "education",
    name: "Education",
    src: "/education/",
    imageIdDesktop: "PhotoEducationDesktop",
    imageIdMobile: "PhotoEducationMobile",
    colWidth: {
      base: "100%",
      md: "100%",
    },
    fullWidth: true,
    hasMobileImage: true,
  },
  {
    id: "environment",
    name: "Environment",
    src: "/environment/",
    imageId: "PhotoEnvironment",
    colWidth: {
      base: "100%",
      md: "50%",
    },
    fullWidth: false,
    hasMobileImage: false,
  },
  {
    id: "celebrate",
    name: "Celebrate & Give",
    src: "/celebrate-and-give/",
    imageId: "PhotoCelebrate",
    colWidth: {
      base: "100%",
      md: "50%",
    },
    fullWidth: false,
    hasMobileImage: false,
  },
];

const Container = styled.section`
  margin: 0 auto 3rem;
  max-width: 1080px;
  position: relative;
  width: 100%;
`;

const TileCont = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Tile = styled.div`
  height: 228px;
  overflow: hidden;
  padding: 4px;
  position: relative;
  & img {
    border-radius: 4px;
  }
  width: 100%;
  @media (min-width: 480px) {
    &.fullWidth {
      width: 100%;
    }
    &.halfSize {
      width: 50%;
    }
  }
  & a {
    border-radius: 4px;
    display: block;
    height: 100%;
    overflow: hidden;
    position: relative;
    img {
      border-radius: 4px;
      height: 100%;
      width: 100%;
    }
  }
  & a.health {
    background: url(/img/mainphoto_health.jpg) 0 0 no-repeat;
    background-size: cover;
  }
  & a.village {
    background: url(/img/mainphoto_village-ver3.jpg) 0 0 no-repeat;
    background-size: cover;
  }
  & a.water {
    background: url(/img/mainphoto_water.jpg) 0 0 no-repeat;
    background-size: cover;
  }
  & a.education {
    background: url(/img/mainphoto_education.jpg) 0 0 no-repeat;
    background-size: cover;
  }
  & a.environment {
    background: url(/img/mainphoto_environment.jpg) 0 0 no-repeat;
    background-size: cover;
  }
  & a.celebrate {
    background: url(/img/mainphoto_celebrate.jpg) 0 0 no-repeat;
    background-size: cover;
  }
`;

// & img {
//     transition: transform 0.8s ease-in-out;
//     border-radius: 4px;
//   }
//   &:hover img {
//     transform: scale(1.01);
//   }

const Heading = styled.h2`
  margin: 0 0 0.5em;
  text-align: center;
`;
// margin: 2rem 0 1rem;
// text-align: center;

const SubHeading = styled.span`
  color: #fff;
  display: inline-block;
  font-size: 2.4rem;
  margin: 0 9px;
  padding: 0 0.6em;
  text-align: center;
  text-shadow: 5px 0px 15px rgba(150, 150, 150, 0.84);
  z-index: 3;
`;

const Overlay = styled.div`
  align-items: center;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  height: 100%;
  justify-content: center;
  left: 0;
  position: absolute;
  top: left;
  width: 100%;
  z-index: 2;
  &:hover {
    span {
      font-size: 2.8rem;
      border-bottom: 1px solid #fff;
      transition: all 0.5s ease-in-out;
    }
  }
`;
