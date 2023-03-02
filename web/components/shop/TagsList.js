import styled from "@emotion/styled";
// import {Link} from "gatsby";

const TagHeading = styled.h3`
  display: inline-block;
  font-size: 0.9em;
  margin: 1rem 0 0.5rem;
`;

const Stack = styled.div`
  display: flex;
  flex-direciton: row;
  flex-wrap: wrap;
`;

const Tag = styled.span`
  align-items: center;
  background: #edf2f7;
  border-radius: 0.375rem;
  color: #1a202c;
  display: inline-flex;
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.2;
  margin-right: 8px;
  max-width: 100%;
  min-height: 1.5rem;
  min-width: 1.5rem;
  outline: 0;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  vertical-align: top;
`;

export const TagsList = (props) => {
  return (
    <>
      <TagHeading>Tags:</TagHeading>
      <Stack>
        {props.tags.map((tag) => (
          <Tag key={tag.value + `tag`}>{tag.label}</Tag>
        ))}
      </Stack>
    </>
  );
};
