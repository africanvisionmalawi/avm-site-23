import CartLink from "components/CartLink";
import NavLogo from "components/NavLogo";
import { Search } from "components/search/Search";
import { navLinks } from "constants/nav";
import React from "react";
import styles from "./main.module.css";
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
      <nav className={styles.desktopNav}>
        <NavLogo />
        <div className={styles.row}>
          <ul className={styles.menu}>
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
          </ul>
          <div clasName={styles.iconRow}>
            <div className={styles.iconCont}>
              <Search />
            </div>
            <div className={styles.iconCont}>
              <CartLink />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

// const NavIcons = styled.div`
//   display: flex;
// `;

export default Navbar;
