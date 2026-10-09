import styled from "@emotion/styled";
import { MoreButton } from "components/card/MoreButton";
import { MarkdownContent } from "components/common/MarkdownContent";

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
  return (
    <Content>
      {title ? <Heading>{title}</Heading> : null}
      {linkText ? <MarkdownContent content={linkText} /> : null}
      {url ? <MoreButton url={url} /> : null}
    </Content>
  );
};
