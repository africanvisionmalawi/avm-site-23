import styled from "@emotion/styled";
import { Raleway, Roboto_Flex } from "@next/font/google";
import Footer from "components/footer/Footer";
import layoutStyles from "components/layout.module.css";
import Navbar from "components/nav/main";
import SubNavBar from "components/nav/sub";
import { OurWorkTiles } from "components/ourwork";

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

const roboto = Roboto_Flex({
  subsets: ["latin"],
  variable: "--font-roboto",
  // default, can also use "swap" to ensure custom font always shows
  display: "optional",
});

const raleway = Raleway({
  subsets: ["latin"],
  variable: "--font-raleway",
  // default, can also use "swap" to ensure custom font always shows
  display: "optional",
});

export default function Layout({ children }) {
  return (
    <div className={`${roboto.variable} ${raleway.variable}`}>
      <Header>
        <HeaderInner>
          <Navbar />
        </HeaderInner>
      </Header>
      <SubNavBar />
      <Wrapper>
        <div className="main-body">
          <main>{children}</main>
          <OurWorkTiles displayHeading={true} />
        </div>
        <div className={layoutStyles.container__lower}>
          <Footer />
        </div>
      </Wrapper>
    </div>
  );
}
