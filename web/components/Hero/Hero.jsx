import styled from "@emotion/styled";
// import SanityImage from "gatsby-plugin-sanity-image";
import { Image } from "components/common/image/Image";
import { Divider } from "../common/Divider";

export const Hero = ({
  heroHeading,
  heroSubHeading,
  heroHeadingType,
  hasMobileImage,
  desktopImage,
  mobileImage,
  children,
  image,
  displayOverlay = false,
}) => {
  let heroHeadingHtml;
  if (heroHeading) {
    if (heroHeadingType === "h1") {
      heroHeadingHtml = <HeroHeadingH1>{heroHeading}</HeroHeadingH1>;
    } else {
      heroHeadingHtml = <HeroHeadingH2>{heroHeading}</HeroHeadingH2>;
    }
  }

  // console.log("mobileImage ", mobileImage);

  // console.log("image ", image);
  // const sources = fluidMobile
  //   ? [
  //       fluidMobile,
  //       {
  //         ...fluid,
  //         media: `(min-width: 580px)`,
  //       },
  //     ]
  //   : fluid;

  // console.log("herosubheading ", heroSubHeading);

  return (
    <HeroContainer className={children ? "lowerPage" : null}>
      <HeroCont>
        {heroHeadingHtml ? (
          <HeroMsgCont>
            {/* {heroHeadingHtml} */}
            {heroSubHeading ? <HeroMsg>{heroSubHeading}</HeroMsg> : null}
          </HeroMsgCont>
        ) : null}

        {children && <ChildrenCont>{children}</ChildrenCont>}

        {image ? (
          <Image
            className={mobileImage ? "desktopImage" : ""}
            image={image}
            alt=""
            // width="100vw"
            maxWidth={2180}
            // height={650}
            maxHeight={650}
            fill
            style={{
              objectFit: "cover",
              // height: "auto",
              // maxWidth: "100vw",
            }}
            priority="eager"
            sizes="(max-width: 1140px) 100vw, 320px"
          />
        ) : null}
        {mobileImage ? (
          <Image
            className="mobileImage"
            image={mobileImage}
            alt=""
            // width="100vw"
            maxWidth={600}
            // height={650}
            maxHeight={350}
            fill
            // style={{
            //   objectFit: "cover",
            //   height: "auto",
            //   // maxWidth: "100vw",
            // }}
            priority
            sizes="100vw"
          />
        ) : null}

        {/* {image ? (
          <SanityImage
            {...sanityImage}
            width={1024}
            height={400}
            alt=""
            style={{
              width: "100%",
              height: "auto",
              objectFit: "cover",
            }}
            sizes="(max-width: 1140px) 100vw, 1140px"
          />
        ) : null} */}

        {children && !displayOverlay ? null : <Overlay />}
      </HeroCont>
      {children ? null : <Divider />}
    </HeroContainer>
  );
};

const ChildrenCont = styled.div`
  background: #58b5d7;
  box-shadow: 0 3px 6px -4px rgba(0, 0, 0, 0.12),
    0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05);
  color: #fff;
  padding: 1rem;
  text-align: center;
  width: 100%;
  z-index: 6;
  & p {
    margin-bottom: 0.5rem;
  }
  @media (min-width: 750px) {
    border-radius: 0 8px 0 0;
    bottom: 0;
    left: 0;
    position: absolute;
    max-width: 480px;
  }
  @media (min-width: 800px) {
    border-radius: 8px;
    bottom: 60px;
    left: 50%;
    transform: translateX(-50%);
  }
  @media (min-width: 1800px) {
    max-width: 600px;
    padding: 40px;
    & p {
      font-size: 1.5rem;
      margin-bottom: 1.5rem;
    }
  }
`;

const HeroContainer = styled.div`
  height: 300px;
  position: relative;
  maxheight: 300px;
  max-width: 2180px;
  margin: 0 auto;
  &.lowerPage {
    border-top: 1px solid #000;
    border-bottom: 1px solid #000;
    margin-bottom: 2rem;
  }
  @media (max-width: 580px) {
    & .mobileImage {
      display: block;
    }
    & .desktopImage {
      display: none;
    }
  }
  @media (min-width: 581px) {
    & .mobileImage {
      display: none;
    }
  }
`;

const HeroCont = styled.div`
  background-size: cover;
  background-repeat: no-repeat;
  height: 100%;
  justify-content: center;
  position: relative;
  @media (max-width: 750px) {
    display: flex;
    flex-direction: column-reverse;
  }
  & > img {
    object-fit: cover;
  }
`;

const HeroHeadingH1 = styled.h1`
  font-size: 2em;
  margin: 2rem auto 0.5rem;
  text-align: center;
  @media (min-width: 580px) {
    margin-top: 2rem;
  }
  @media (min-width: 1024px) {
    color: #fff;
    font-size: 2.3em;
    margin: 0 auto;
    text-shadow: 0 0 20px #000;
  }
  @media (min-width: 1280px) {
    font-size: 2.5em;
  }
`;

const HeroHeadingH2 = styled.h2`
  font-size: 1.8rem;
  margin: 0.5em auto 0.5em;
  text-align: center;
  @media (min-width: 1024px) {
    color: #fff;
    font-size: 2.1rem;
    margin: 0 auto;
    text-shadow: 0 0 20px #000;
  }
  @media (min-width: 1280px) {
    font-size: 2.3rem;
  }
`;

const HeroMsg = styled.p`
  font-size: 1.1rem;
  margin: 0 auto;
  text-align: center;
  @media (min-width: 1024px) {
    color: #fff;
    text-shadow: 0 0 20px #000;
  }
  @media (min-width: 1280px) {
    font-size: 1.5em;
  }
`;

const Overlay = styled.div`
  background-image: linear-gradient(
    to bottom,
    transparent 0,
    rgba(0, 0, 0, 0.5) 100%
  );
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 5;
  @media (max-width: 1023px) {
    display: none;
  }
`;

const HeroMsgCont = styled.div`
  padding: 1rem;
  @media (min-width: 1024px) {
    bottom: 60px;
    left: 50%;
    max-width: 880px;
    position: absolute;
    transform: translateX(-50%);
    width: 100%;
    z-index: 6;
  }
  @media (min-width: 1280px) {
    max-width: 1080px;
  }
`;
