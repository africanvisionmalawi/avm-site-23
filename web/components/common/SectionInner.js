import styled from "@emotion/styled";

const Section = styled.section`
  margin: 0 auto;
  padding: 0 1rem 1rem;
  position: relative;
`;

export const SectionInner = ({ children }) => {
  return <Section>{children}</Section>;
};
