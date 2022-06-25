import React, { useState } from 'react';
import { ReactReader } from 'react-reader';
import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  background: linear-gradient(to bottom, #f2f2f2 0%, #333 100%);
  overflow: hidden;
`;
export const ReaderContainer = styled.div`
  font-size: 16px;
  position: absolute;
  top: 1rem;
  left: 1rem;
  right: 1rem;
  bottom: 1rem;
  transition: all 0.6s ease;
`;

const EPUBViewer = ({ url }) => {
  const [location, setLocation] = useState(null);

  const locationChanged = (epubcifi) => {
    console.log(epubcifi);
    setLocation(epubcifi);
  };

  const getRendition = (rendition) => {
    rendition.themes.fontSize('100%');
  };

  return (
    <Container>
      <ReaderContainer>
        <ReactReader
          url={url}
          location={location}
          locationChanged={locationChanged}
          getRendition={getRendition}
        />
      </ReaderContainer>
    </Container>
  );
};

export default EPUBViewer;
