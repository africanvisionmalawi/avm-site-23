import styled from "@emotion/styled";
import { PortableText } from "components/portable-text/BasePortableText";

export const BannerMsg = ({ msg, source }) => {
  return (
    <HeroMsgDiv>
      {msg ? <PortableText blocks={msg} /> : null}
      {source ? <Citation>{source}</Citation> : null}
    </HeroMsgDiv>
  );
};

const HeroMsgDiv = styled.div`
  margin: 3em auto;
  max-width: 650px;
  p {
    font-size: 1.7rem;
  }
  padding: 0 2rem;
`;

// const Content = styled.div`
//   font-family: "Roboto", sans-serif;
//   font-size: 1.6em;
//   text-align: center;
// `;

const Citation = styled.div`
  font-size: 0.8em;
  text-align: right;
`;
