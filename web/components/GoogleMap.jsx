import styled from "@emotion/styled";

const MapContainer = styled.div`
  margin: 1rem auto;
  max-width: 848px;
`;

export const GoogleMap = (props) => {
  //   const { url, text } = props;
  const iframe = `<iframe src=${props.url} width="100%" height="550"></iframe>`;

  return (
    <MapContainer>
      <div dangerouslySetInnerHTML={{ __html: props.url ? iframe : "" }} />
    </MapContainer>
  );
};
