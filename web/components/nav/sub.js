import styled from "@emotion/styled";
import CartLink from "components/CartLink";
import { CtaButton } from "components/common/CtaButton";
import NavLogo from "components/NavLogo";
import { navLinks } from "constants/nav";
import React, { useState } from "react";
// import Search from "../search";
// const searchIndices = [{ name: `Pages`, title: `Pages` }];
// const { SubMenu } = Menu;

const SubNavBar = () => {
  // const [current, setCurrent] = useState("mail");
  const [drawerVisible, setDrawerVisible] = useState(false);

  // const handleClick = (e) => {
  //   setCurrent(e.key);
  // };

  // const { isOpen, onOpen, onClose } = useDisclosure();
  // const btnRef = React.useRef();

  // function clicker() {
  //   console.log(isExpanded); // logs false for the initial render
  //   setToggleExpansion((prev) => !prev);
  //   console.log(isExpanded); // logs false for the initial render
  // }

  const toggleMenu = () => {
    setDrawerVisible((prev) => !prev);
    // console.log("here", drawerVisible);
  };

  return (
    <NavCont>
      <Drawer className={drawerVisible ? "open" : ""}>
        <DrawerOverlay className={drawerVisible ? "open" : ""} />
        <DrawerContent className={drawerVisible ? "open" : ""}>
          <CloseBtn onClick={toggleMenu}>X</CloseBtn>
          <Menu>
            {navLinks.map((link, i) => (
              <React.Fragment key={i}>
                {link.length > 1 ? (
                  <li>
                    <label htmlFor={`m${i}`}>{link[0].name}</label>
                    <input type="checkbox" id={`m${i}`} />
                    <ul>
                      {link[1].map((subMenu, i) => (
                        <React.Fragment key={i}>
                          <li>
                            <a href={subMenu.url}>{subMenu.name}</a>
                          </li>
                        </React.Fragment>
                      ))}
                    </ul>
                  </li>
                ) : (
                  <li>
                    <a href={link[0].url}>{link[0].name}</a>
                  </li>
                )}
              </React.Fragment>
            ))}
          </Menu>
        </DrawerContent>
      </Drawer>
      <Nav>
        <NavInner>
          <CtaButton
            link="https://www.crowdfunder.co.uk/apf/step/basics/7nPGOrqW"
            text="Fundraise for us"
            placement="header"
          />
          <CtaButton
            link="https://www.charitycheckout.co.uk/1113786/"
            text="Donate"
            placement="header"
          />
        </NavInner>
        <MobileNav>
          <NavLogo />
          <NavIcons>
            <NavIconsInner>
              <InnerFlex>
                <CtaButton
                  link="https://www.crowdfunder.co.uk/apf/step/basics/7nPGOrqW"
                  text="Fundraise for us"
                  placement="header"
                />
              </InnerFlex>
              <CtaButton
                link="https://www.charitycheckout.co.uk/1113786/"
                text="Donate"
                placement="header"
              />
            </NavIconsInner>
            <IconsCont>{/* <Search indices={searchIndices} /> */}</IconsCont>
            <IconsCont>
              <CartLink variant="orange" />
            </IconsCont>
            <IconsCont>
              <MobileNavIcon
                type="primary"
                onClick={toggleMenu}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <title>Hamburger</title>
                <path
                  d="M24,19v2a1,1,0,0,1-1,1H1a.94.94,0,0,1-.7-.3A1,1,0,0,1,0,21V19a1,1,0,0,1,.3-.7A.94.94,0,0,1,1,18H23a1,1,0,0,1,1,1Zm0-8v2a.94.94,0,0,1-.3.7,1,1,0,0,1-.7.3H1a.94.94,0,0,1-.7-.3A.94.94,0,0,1,0,13V11a.94.94,0,0,1,.3-.7A.94.94,0,0,1,1,10H23a1,1,0,0,1,.7.3A.94.94,0,0,1,24,11Zm0-8V5a1,1,0,0,1-1,1H1a.94.94,0,0,1-.7-.3A1,1,0,0,1,0,5V3a.94.94,0,0,1,.3-.7A.94.94,0,0,1,1,2H23a1,1,0,0,1,.7.3A.94.94,0,0,1,24,3Z"
                  fill="#f99d1c"
                />
              </MobileNavIcon>
            </IconsCont>
          </NavIcons>
        </MobileNav>
      </Nav>
    </NavCont>
  );
};
const CloseBtn = styled.div`
  color: #aaa;
  cursor: pointer;
  font-size: 2rem;
  font-weight: 100;
  opacity: 1;
  position: absolute;
  right: 8px;
  top: -3px;
`;

const DrawerOverlay = styled.div`
  background: rgba(0, 0, 0, 0.5);
  position: absolute;
  height: 100%;
  opacity: 0;
  width: 100%;
  z-index: 1300;
  &.open {
    opacity: 100;
    transition: opacity 0.4s ease-in-out;
  }
`;

const Drawer = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  transform: translateX(200%);
  transition: transform 0.4s ease-in-out 0.4s;
  z-index: 100;
  &.open {
    transform: translateX(0);
    transition: transform 0ms ease-in-out;
  }
`;

const DrawerContent = styled.div`
  background-color: #fff;
  height: 100%;
  overflow-y: auto;
  position: absolute;
  right: 0;
  transform: translateX(100%);
  transition: all 0.4s ease-in-out;
  z-index: 1400;

  &.open {
    min-width: 50vw;
    max-width: calc(100vw - 20px);
    width: 300px;
    transform: translateX(0);
    transition: transform 0.4s ease-in-out;
  }
`;

const NavInner = styled.div`
  display: none;
  justify-content: space-between;
  flex-wrap: nowrap;
  @media (min-width: 768px) {
    background: rgba(255, 255, 255, 0.7);
    border-radius: 0 0 6px 6px;
    display: flex;
  }
`;

const NavIconsInner = styled.div`
  background: rgba(255, 255, 255, 0.7);
  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap;
`;

const InnerFlex = styled.div`
  display: none;
  @media (min-width: 576px) {
    display: flex;
  }
`;

const NavCont = styled.div`
  position: sticky;
  top: 0;
  z-index: 7;
`;
const Nav = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-wrap: nowrap;
  margin: 0 auto;
  max-width: 1060px;
  width: 100%;
`;

const IconsCont = styled.div`
  align-items: center;
  background: rgba(255, 255, 255, 0.7);
  display: flex;
  height: 48px;
  justify-content: center;
  padding: 0 4px;
`;

const Menu = styled.ul`
  font-size: 1em;
  padding: 1em;

  &,
  & ul {
    list-style-type: none;
  }

  & ul {
    max-height: 0;
    opacity: 0;
    transition: all 0.5s;
    visibility: hidden;
  }

  & li {
    margin-bottom: 0.5em;
  }
  & label {
    color: #b75906;
    cursor: pointer;
  }
  & input[type="checkbox"] {
    display: none;
  }
  & input:checked + ul {
    max-height: 999px;
    opacity: 1;
    visibility: visible;
  }
`;

const MobileNav = styled.div`
  align-items: flex-end;
  height: 48px;
  justify-content: flex-end;
  margin: 4px 16px 0 0;
  position: sticky;
  text-transform: uppercase;
  top: 10px;
  width: 100%;
  @media (min-width: 370px) {
    flex-direction: row;
  }
  @media (min-width: 768px) {
    display: none;
  }
`;

const NavIcons = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const MobileNavIcon = styled.svg`
  cursor: pointer;
  display: block;
  fill: #fff;
  height: 28px;
  width: 28px;
`;

export default SubNavBar;
