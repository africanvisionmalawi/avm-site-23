// import PropTypes from 'prop-types'
import styled from "@emotion/styled";
// import heroStyles from './heroimage.module.css'

const LogoCont = styled.div`
  & a {
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
    border-radius: 8px;
    display: block;
    left: 8px;
    overflow: hidden;
    position: absolute;
    top: 0;
    z-index: 9;
    @media (min-width: 768px) {
      border-top-left-radius: 0;
      border-top-right-radius: 0;
    }
  }
`;

const NavLogo = styled.figure`
  background: #fff;
  height: 70px;
  margin: 0;
  padding: 0 0.5rem;
  @media (min-width: 768px) {
    height: 90px;
  }
  & img {
    display: block;
    height: 100%;
    object-fit: contain;
    width: auto;
    @media (min-width: 768px) {
      height: 100%;
    }
  }
`;

const navLogo = () => (
  <LogoCont>
    <a href="/">
      <NavLogo>
        <img src="/img/common/logo-full.png" alt="" />
      </NavLogo>
    </a>
  </LogoCont>
);

export default navLogo;
