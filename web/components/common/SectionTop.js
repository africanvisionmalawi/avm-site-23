import styled from "@emotion/styled";

const TextSection = styled.div`
  margin: 0 auto;
  max-width: 885px;
  padding: 4rem 1rem;
  position: relative;
  width: 100%;
`;

export const SectionTop = ({ children }) => {
  return <TextSection>{children}</TextSection>;
};
