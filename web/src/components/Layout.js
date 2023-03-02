import styled from "@emotion/styled";
import "@fontsource/raleway";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import { OurWorkTiles } from "components/ourwork";
import { withPrefix } from "gatsby";
import { Helmet } from "react-helmet";
// import FeaturedProjectsTiles from "../components/FeaturedProjectsTiles";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/nav/main";
import SubNavBar from "../../components/nav/sub";
import { siteMeta } from "../../constants/site";
// import NavLogo from "../components/NavLogo";
import "./css/all.css";
import layoutStyles from "./layout.module.css";

// import useSiteMetadata from "./SiteMetadata";

const TemplateWrapper = ({ title, description, article, children, path }) => {
  // const { siteTitle, siteDescription } = useSiteMetadata();
  return (
    <div className={`mainContainer ${layoutStyles.container}`}>
      <Helmet>
        <html lang="en" />
        <title>{title ? title + " | " + siteMeta.title : siteMeta.title}</title>
        <meta
          name="description"
          content={description ? description : siteMeta.description}
        />
        <link
          rel="apple-touch-icon"
          sizes="57x57"
          href={`${withPrefix("/")}img/apple-icon-57x57.png`}
        />
        <link
          rel="apple-touch-icon"
          sizes="60x60"
          href={`${withPrefix("/")}img/apple-icon-60x60.png`}
        />
        <link
          rel="apple-touch-icon"
          sizes="72x72"
          href={`${withPrefix("/")}img/apple-icon-72x72.png`}
        />
        <link
          rel="apple-touch-icon"
          sizes="76x76"
          href={`${withPrefix("/")}img/apple-icon-76x76.png`}
        />
        <link
          rel="apple-touch-icon"
          sizes="114x114"
          href={`${withPrefix("/")}img/apple-icon-114x114.png`}
        />
        <link
          rel="apple-touch-icon"
          sizes="120x120"
          href={`${withPrefix("/")}img/apple-icon-120x120.png`}
        />
        <link
          rel="apple-touch-icon"
          sizes="144x144"
          href={`${withPrefix("/")}img/apple-icon-144x144.png`}
        />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href={`${withPrefix("/")}img/apple-icon-152x152.png`}
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href={`${withPrefix("/")}img/apple-icon-180x180.png`}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href={`${withPrefix("/")}img/android-icon-192x192.png`}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href={`${withPrefix("/")}img/favicon-32x32.png`}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href={`${withPrefix("/")}img/favicon-96x96.png`}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href={`${withPrefix("/")}img/favicon-16x16.png`}
        />
        <meta name="theme-color" content="#fff" />

        <meta property="og:type" content="business.charity" />
        <meta property="og:title" content={title} />
        <meta property="og:url" content="/" />
        <meta
          property="og:image"
          content={`${withPrefix("/")}img/og-image.jpg`}
        />
      </Helmet>
      <Header>
        <HeaderInner>
          <Navbar />
        </HeaderInner>
      </Header>
      <SubNavBar />
      <Wrapper>
        <div className={layoutStyles.container__top}>
          <div className="main-body">{children}</div>
          <OurWorkTiles displayHeading={true} />
        </div>
        <div className={layoutStyles.container__lower}>
          <Footer />
        </div>
      </Wrapper>
    </div>
  );
};

// const TopNav = styled.div`
//   background: red;
//   position: sticky;
//   top: 0;
//   z-index: 2000;
// `;

const Header = styled.div`
  background-color: #c27e34;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4'%3E%3Cpath fill='%239a662e' fill-opacity='0.4' d='M1 3h1v1H1V3zm2-2h1v1H3V1z'%3E%3C/path%3E%3C/svg%3E");
  box-shadow: inset 0px -4px 8px -5px #482a1e;
  height: auto;
`;

const HeaderInner = styled.div`
  margin: 0 auto;
  max-width: 1180px;
  position: relative;
  width: 100%;
`;

const Wrapper = styled.div`
  background: #fff;
  margin: 0 auto;
  position: relative;
  width: 100%;
`;

export default TemplateWrapper;
