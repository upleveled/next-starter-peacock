import React from 'react';
import { Container } from '../container';
import { StyledPageHeading } from '../styles/header.styles';

const AboutHeader = () => (
  <StyledPageHeading>
    <Container>
      <div className="header-container">
        <h1 className="about-header">
          About Me
          <span aria-label="person-doing-meditation" role="img">
            🧘🏾‍♂️
          </span>
        </h1>
      </div>
    </Container>
  </StyledPageHeading>
);

export default AboutHeader;
