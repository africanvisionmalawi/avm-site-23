import styled from "@emotion/styled";
import { getCurrentYear } from "lib/helpers";
import footerStyles from "./footer.module.css";
import { FooterForm } from "./FooterForm";

const LogoImg = styled.img`
  display: block;
  height: 120px;
  margin: 0 12px 1em 0;
  width: 83px;
`;

const FooterMain = styled.div`
  padding: 0 1rem;
  width: 100%;
`;

const FooterRow = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  @media (min-width: 650px) {
    flex-direction: row;
    flex-wrap: no-wrap;
    margin-bottom: 45px;
  }
`;

const FooterBottomRow = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  flex-wrap: no-wrap;
  margin-bottom: 45px;
`;

const FooterInnerRow = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const FooterCol = styled.div`
  margin-bottom: 45px;
  width: 100%;
  @media (min-width: 650px) {
    flex: 0 0 33.33333333%;
    margin-bottom: 0;
    max-width: 33.33333333%;
  }
`;

const FooterContact = styled.div`
  margin-bottom: 45px;
`;

const FooterSocial = styled.div`
  & p {
    font-size: 0.8em;
  }
`;

const CartLink = styled.span`
  cursor: pointer;
`;

const Heading = styled.h3`
  &,
  & a:link,
  & a:visited {
    color: #246a73;
  }
  margin-bottom: 0.5rem;
`;

const Footer = () => (
  <footer className={footerStyles.footer} role="contentinfo">
    <FooterForm />
    <div className={footerStyles.footerInner}>
      <FooterMain>
        <nav role="navigation">
          <FooterRow justify="center">
            <FooterCol xs={12} sm={8}>
              <Heading>What we do</Heading>
              <ul className={footerStyles.list}>
                <li>
                  <a href="/sams-village/">Sam's Village</a>
                </li>
                <li>
                  <a href="/water/">Water</a>
                </li>
                <li>
                  <a href="/health/">Health</a>
                </li>
                <li>
                  <a href="/education/">Education</a>
                </li>
                <li>
                  <a href="/environment/">Environment</a>
                </li>
              </ul>
            </FooterCol>

            <FooterCol xs={12} sm={8}>
              <Heading>
                <a href="/news/">Latest news &amp; events</a>
              </Heading>
              <ul className={footerStyles.list}>
                <li>
                  <a href="/news/">News</a>
                </li>
                <li>
                  <a href="/events/">Events</a>
                </li>
              </ul>
            </FooterCol>

            <FooterCol xs={12} sm={8}>
              <Heading>
                <a href="/shop/">Shop</a>
              </Heading>
              <ul className={footerStyles.list}>
                <li>
                  <a href="/shop/">View all products</a>
                </li>
                <li>
                  <CartLink className="snipcart-summary snipcart-checkout">
                    View cart
                  </CartLink>
                </li>
              </ul>
            </FooterCol>
          </FooterRow>
        </nav>

        <FooterContact>
          <Heading className="footer_contact">Contact</Heading>
          <p>
            email:{" "}
            <a href="mailto:info@africanvision.org.uk">
              info@africanvision.org.uk
            </a>
            <br />
            tel (United Kingdom): +44 (0)20 8287 8169
            <br />
            tel (Malawi): +265 9 99 759 005
            <br />
            post (United Kingdom): 31 Upper Brighton Road, Surbiton, Surrey KT6
            6QX
            <br />
            post (Malawi): P.O. Box 30928, Lilongwe
          </p>
        </FooterContact>
        <FooterSocial>
          <FooterBottomRow>
            <LogoImg src="/img/logo-full.png" alt="" />
            <FooterInnerRow>
              <Heading>
                <a href="/news">Join us on&hellip;</a>
              </Heading>
              <ul className={footerStyles.iconsList}>
                <li>
                  <a href="https://www.facebook.com/africanvision">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      className={footerStyles.icon}
                    >
                      <path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z" />
                    </svg>
                  </a>
                </li>
                <li>
                  <a href="https://www.youtube.com/landirani">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 576 512"
                      className={footerStyles.icon}
                    >
                      <path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z" />
                    </svg>
                  </a>
                </li>
                <li>
                  <a href="https://www.instagram.com/africanvisionmalawi/">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                      className={footerStyles.icon}
                    >
                      <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
                    </svg>
                  </a>
                </li>
              </ul>
              <p className="source-org copyright">
                &copy; {getCurrentYear()} African Vision Malawi. Registered
                charity 1113786.{" "}
                <a href="/privacy-statement/">View our Privacy Statement</a>
              </p>
            </FooterInnerRow>
          </FooterBottomRow>
        </FooterSocial>
      </FooterMain>
    </div>
  </footer>
);

export default Footer;
