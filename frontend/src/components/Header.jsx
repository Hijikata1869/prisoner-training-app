import React, { Fragment } from 'react';
import styled from 'styled-components';

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  padding: 2px 32px;
  background-color: gray;
`;

const Title = styled.h1`
  color: white;
  padding: 0px;
`;

export const Header = () => {
  return(
    <Fragment>
      <HeaderWrapper>
        <Title>プリズナートレーニング</Title>
      </HeaderWrapper>
    </Fragment>
  )
}
