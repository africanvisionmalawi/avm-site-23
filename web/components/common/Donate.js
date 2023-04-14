import styled from "@emotion/styled";
import { CtaButton } from "./CtaButton";

const Container = styled.div`
  background: #58b5d7;
  margin-bottom: 3em;
  padding: 30px 0;
  text-align: center;
`;

const ContainerInner = styled.div`
  background: #58b5d7;
  box-shadow: 0 3px 6px -4px rgba(0, 0, 0, 0.12),
    0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05);
  color: #fff;
  padding: 1rem;
  text-align: center;
  z-index: 6;
  @media (min-width: 750px) {
    border-radius: 0 8px 0 0;
    bottom: 0;
    font-size: 1.4rem;
    left: 0;
    position: absolute;
    max-width: 480px;
  }
  @media (min-width: 800px) {
    border-radius: 8px;
    bottom: 60px;
    left: 50%;
    transform: translateX(-50%);
  }
`;

const ContainerWithPhoto = styled.div`
  background: url(/img/hero/donate-mobile.jpg) 0 0 no-repeat;
  border-radius: 8px;
  height: 150px;
  margin-bottom: 2rem;
  padding-top: 400px;
  position: relative;
  width: 100%;
  @media (min-width: 480px) {
    background: url(/img/hero/donate-desktop.jpg) 00 no-repeat;
    padding-top: 0;
    height: 540px;
  }
`;

export const Donate = (props) => {
  const {
    displayImage = true,
    link = "https://www.charitycheckout.co.uk/1113786/",
    text = "Donate",
  } = props;
  return (
    <>
      {displayImage ? (
        <ContainerWithPhoto>
          <ContainerInner>
            <p>
              Donate now to help us help children &amp; vulnerable people in
              Malawi.
            </p>
            <CtaButton link={link} text={text} placement="alt" />
          </ContainerInner>
        </ContainerWithPhoto>
      ) : (
        <Container>
          <CtaButton link={link} text={text} placement="alt" />
        </Container>
      )}
    </>
  );
};
