import styled from "@emotion/styled";
import { MoreButton } from "components/card/MoreButton";
import { PortableText } from "components/portable-text/BasePortableText";

const Content = styled.div`
  padding: 1rem;
  @media (min-width: 576px) {
    padding: 1rem 3px;
  }
`;

const Heading = styled.h3`
  margin-bottom: 0.5rem;
`;

export const CardContent = ({ title, url, linkText }) => {
  // console.log("linkText ", linkText);
  // console.log("url is ", url);
  return (
    <Content>
      {title ? <Heading>{title}</Heading> : null}
      {/* {props.displayLocation && <span>{props.location}</span>} */}
      {linkText ? <PortableText blocks={linkText} /> : null}
      {/* TODO: add hideLink here */}
      {url ? <MoreButton url={url} /> : null}
    </Content>
  );
};
