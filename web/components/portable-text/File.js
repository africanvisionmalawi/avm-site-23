import styled from "@emotion/styled";
import { IconContext } from "react-icons";
import { ImFilePdf } from "react-icons/im";

const Container = styled.a`
  align-items: center;
  border: 1px dashed #f99d1c;
  display: flex;
  margin: 1rem auto;
  padding: 2rem;
  width: 80%;
  svg {
    height: 80px;
    margin-right: 1rem;
  }
`;

const Heading = styled.h4`
  margin-bottom: 0;
`;

const Text = styled.p`
  font-style: italic;
  margin-bottom: 0;
  word-break: break-word;
`;

export default (props) => {
  // console.log("props **** ", props);
  const { asset, description } = props.value;
  // console.log("asset ", asset);
  if (!asset) {
    return null;
  }
  return (
    <Container href={asset.url}>
      <IconContext.Provider value={{ size: "3rem" }}>
        <ImFilePdf />
      </IconContext.Provider>
      <div>
        {description ? <Heading>{description}</Heading> : null}
        <Text>{asset.originalFilename}</Text>
      </div>
    </Container>
  );
};
