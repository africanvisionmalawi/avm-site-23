import styled from "@emotion/styled";
import React from "react";

export const Breadcrumbs = ({ path, indexPage }) => {
  // console.log("path is  " + path);
  // console.log("indexpage ", indexPage);
  // console.log("path length ", path.length);
  if (indexPage) {
    path.pop();
  }
  // console.log("path length ", path.length);
  return (
    <Container>
      <Links>
        <a href="/">Home</a>
        {path.length
          ? path.map((c, i) => (
              <React.Fragment key={i}>
                {i < path.length - 1 ? (
                  <a href={`/${c.slug}/`}>{c.title}</a>
                ) : (
                  <CrumbCurrent>{c.title}</CrumbCurrent>
                )}
              </React.Fragment>
            ))
          : null}
      </Links>
    </Container>
  );
};

const Container = styled.div`
  display: none;
  margin: 0 auto;
  max-width: 1080px;
  padding: 0.5rem 100px;
  position: relative;
  @media (min-width: 480px) {
    display: block;
  }
  @media (min-width: 768px) {
    padding-left: 120px;
  }
  @media (min-width: 1140px) {
    padding: 0.5rem 0 0.5rem 90px;
  }
`;

const Links = styled.div`
  max-width: 750px;
  text-transform: capitalize;
  @media (max-width: 767px) {
    overflow-x: auto;
    white-space: nowrap;
  }
  & > a {
    color: #ababad;
    display: inline-block;
    font-size: 0.8em;
    text-transform: capitalize;
  }
  & > a:not(:first-child):before {
    color: #cacaca;
    content: ">";
    display: inline-block;
    margin: 0 8px;
  }
`;

const CrumbCurrent = styled.span`
  color: #ababad;
  display: inline-block;
  font-size: 0.8em;
  text-transform: capitalize;
  &:before {
    color: #cacaca;
    content: ">";
    display: inline-block;
    margin: 0 8px;
  }
`;
