import styled from "@emotion/styled";

const TagsNavCont = styled.div`
  margin: 0 auto 1rem;
  overflow-x: scroll;
  padding: 0 1rem;
`;

const Inner = styled.div`
  overflow-x: auto;
  white-space: nowrap;
  @media (min-width: 579px) {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    overflow-x: visible;
  }
`;

const Tag = styled.span`
  display: inline-block;
  margin: 4px;
  & a {
    border: 1px solid #f99d1c;
    border-radius: 20px;
    color: #f99d1c;
    cursor: pointer;
    display: block;
    padding: 3px 12px;
    text-align: center;
  }
  &.active a {
    background: #f99d1c;
    color: #fff;
  }
  @media (min-width: 579px) {
    margin: 8px;
  }
`;

// const MobileMenu = styled.div`
//   @media (min-width: 580px) {
//     display: none;
//   }
// `;

export const NavTags = (props) => {
  // console.log("props **** ", props);
  return (
    <TagsNavCont>
      <Inner>
        {props.tags.map((tag) => {
          // console.log("active ", props.active);
          return (
            <Tag
              className={props.active === tag.value.current ? "active" : null}
            >
              <a href={`${props.tagsBase}${tag.value.current}`}>{tag.title}</a>
            </Tag>
          );
        })}
      </Inner>
    </TagsNavCont>
  );
};
