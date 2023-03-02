import styled from "@emotion/styled";
import CartLink from "components/CartLink";
import NavLogo from "components/NavLogo";
import { navLinks } from "constants/nav";
import React from "react";
// import Search from "../search";
// const searchIndices = [{ name: `Pages`, title: `Pages` }];
// const { SubMenu } = Menu;

const Navbar = () => {
  // const [current, setCurrent] = useState("mail");
  // const [drawerVisible, setDrawerVisible] = useState(false);

  // const handleClick = (e) => {
  //   setCurrent(e.key);
  // };

  // const { isOpen, onOpen, onClose } = useDisclosure();
  // const btnRef = React.useRef();

  return (
    <>
      <DesktopNav>
        <NavLogo />
        <Row>
          <Menu>
            {navLinks.map((link, index) => (
              <React.Fragment key={index}>
                {link.length > 1 ? (
                  <li>
                    <a href={link[0].url}>{link[0].name}</a>
                    <ul>
                      {link[1].map((subMenu, i) => (
                        <React.Fragment key={i}>
                          {!subMenu.mobileOnly && (
                            <li>
                              <a href={subMenu.url}>{subMenu.name}</a>
                            </li>
                          )}
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
          <IconRow>
            <IconCont>{/* <Search indices={searchIndices} /> */}</IconCont>
            <IconCont>
              <CartLink />
            </IconCont>
          </IconRow>
        </Row>
      </DesktopNav>
    </>
  );
};

const IconRow = styled.div`
  display: flex;
  flex-wrap: nowrap;
  height: 41px;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const Menu = styled.ul`
  align-items: center;
  color: #fff;
  display: flex;
  height: 40px;
  justify-content: flex-start;
  margin: 0;
  min-width: 640px;
  padding: 0 8px;
  width: 100%;
  & a {
    display: block;
  }
  &,
  & li {
    list-style-type: none;
  }
  & a {
    padding: 0 8px;
  }
  & a:link,
  & a:visited {
    color: #fff;
  }
  & > li {
    align-items: center;
    display: flex;
    height: 40px;
    margin: 0 12px;
    position: relative;
  }

  & ul {
    box-shadow: 0 3px 6px -4px rgba(0, 0, 0, 0.12),
      0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05);
    display: block;
    margin: 0;
    min-width: 160px;
    padding: 1rem 0.5rem;
    position: absolute;
    transform: translateY(-50%);
    transition: transform 0.4s ease-in, visiblity 0.4s ease-in-out;
    visibility: hidden;
    z-index: 2000;
  }
  & ul li {
    display: flex;
    flex-wrap: nowrap;
    font-size: 0.9em;
    line-height: 1.4;
    padding: 8px 0;
  }
  & ul li a {
    background: #fff;
    font-size: 0.9em;
    text-transform: capitalize;
  }
  & ul li a:hover {
  }
  & li:hover,
  & li:hover ul {
    background: #fff;
    a:link,
    a:visited {
      color: #b75906;
    }
    a:hover {
      color: #262626;
    }
  }
  & li:hover ul {
    display: block;
    top: 40px;
    transform: translateY(0);
    transition: visiblity 0.2s ease-in-out;
    visibility: visible;
  }
  @media (min-width: 768px) {
    margin-left: 120px;
    min-width: 0;
    width: auto;
  }
`;

const DesktopNav = styled.nav`
  display: none;
  position: relative;
  text-transform: uppercase;

  @media (min-width: 768px) {
    align-items: middle;
    display: flex;
  }
`;

const IconCont = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  right: 40px;
  top: 0;
`;

// const NavIcons = styled.div`
//   display: flex;
// `;

export default Navbar;
