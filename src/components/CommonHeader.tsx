import React from 'react';
import { API_URL } from '../constant/urls';
import { styled } from 'styled-components';

const CommonHeader = () => {
  return (
    <Header>
      <h1>{`${API_URL.owner} / ${API_URL.repo}`}</h1>
    </Header>
  );
};

const Header = styled.header`
  text-align: center;
  background-color: black;
  padding: 20px;
  margin-bottom: 24px;

  h1 {
    font-size: 20px;
    color: #f0f6fc;
  }
`;

export default CommonHeader;
