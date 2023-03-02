import styled from "@emotion/styled";
import { Video } from "components/videos/";

const Container = styled.div`
  background: #f7f7f7;
  border-top: 1px solid #d7dade;
  border-bottom: 1px solid #d7dade;
  margin-bottom: 4rem;
  padding: 2rem 1rem 0;
  p {
    background: #f7f7f7;
  }
`;

const VideosCont = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  grid-template-rows: repeat(auto-fit, minmax(380px, 1fr));
  grid-gap: 1rem;
  grid-auto-flow: dense;
`;

const Heading = styled.h2`
  text-align: center;
`;

// const checkUrl = (url) => {
//   if (url.includes("youtube")) {
//     return "youtube";
//   } else if (url.includes("vimeo")) {
//     return "youtube";
//   } else {
//     return "all";
//   }
// };

export const Videos = ({ videos }) => (
  <Container>
    <Heading>Videos</Heading>
    <VideosCont>
      {videos.map((video) => (
        <div key={video.url}>
          <Video url={video.url} text={video.text} />
        </div>
      ))}
    </VideosCont>
  </Container>
);
