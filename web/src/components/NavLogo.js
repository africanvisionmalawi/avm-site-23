// import PropTypes from 'prop-types'
import styled from "@emotion/styled";
import { Link } from "gatsby";
import logo from "../img/logo-full.png";
// import heroStyles from './heroimage.module.css'

const LogoCont = styled.div`
  & a {
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
    display: block;
    height: 120px;
    position: absolute;
    top: 0;
    width: auto;
    z-index: 9;
    @media (min-width: 768px) {
      height: 160px;
    }
  }
`;
const LogoImg = styled.img`
  display: block;
  height: 120px;
  width: auto;
  @media (min-width: 768px) {
    height: 160px;
  }
`;

const NavLogo = styled.figure`
  margin-bottom: 0;
`;

const navLogo = (Û) => (
  <LogoCont>
    <Link to="/">
      <NavLogo>
        <LogoImg src={logo} alt="" />
      </NavLogo>
    </Link>
  </LogoCont>
);

export default navLogo;
