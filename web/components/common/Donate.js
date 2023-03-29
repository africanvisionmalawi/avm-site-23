import styled from "@emotion/styled";
import { CtaButton } from "./CtaButton";

const Container = styled.div`
  background: #58b5d7;
  margin-bottom: 3em;
  padding: 30px 0;
  text-align: center;
`;

const ContainerWithPhoto = styled.div`
  background: url(/img/hero/donate-mobile.jpg) 0 0 no-repeat;
  height: 300px;
  position: relative;
  width: 100%;
  @media (min-width: 480px) {
    background: url(/img/hero/donate-desktop.jpg) 00 no-repeat;
    height: 540px;
  }
`;

export const Donate = (props) => {
  const {
    displayImage = true,
    link = "https://www.charitycheckout.co.uk/1113786/",
    text,
  } = props;
  return (
    <>
      {displayImage ? (
        <ContainerWithPhoto>
          <p>
            Donate now to help us help children &amp; vulnerable people in
            Malawi.
          </p>
          <CtaButton link={link} text={text} placement="alt" />
        </ContainerWithPhoto>
      ) : (
        <Container>
          <CtaButton link={link} text={text} placement="alt" />
        </Container>
      )}
    </>
  );
};
