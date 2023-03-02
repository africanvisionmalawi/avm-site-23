// import PropTypes from 'prop-types'
// import { Link } from 'gatsby'
// import buttonStyles from './button.module.css'
import styled from "@emotion/styled";

export const CtaButton = ({ link, text, placement }) => (
  <Btn>
    <BtnLink href={link} className={`${placement}`}>
      {text}
    </BtnLink>
  </Btn>
);

// CtaButton.propTypes = {
//     link: PropTypes.string,
//     text: PropTypes.string,
// }

const Btn = styled.span`
  display: block;
`;

const BtnLink = styled.a`
  background: #58b5d7;
  border-radius: 8px;
  display: inline-block;
  font-weight: bold;
  /* padding: 10px 20px; */
  padding: 6px 12px;
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
  &:link,
  &:visited {
    color: #fff;
  }
  &:hover {
    background: #6dbedc;
  }
  &.alt {
    background: #fff;
    border: 2px solid #fff;
    color: #58b5d7;
  }
  &.header {
    font-size: 0.8em;
    margin: 8px 0.5rem;
    padding: 4px 8px;
  }
`;
