import React from 'react';
import { API_URL } from '../constant/urls';
import { styled } from 'styled-components';
import { GoRepo } from 'react-icons/go';

const CommonHeader = () => {
  return (
    <Header>
      <GoRepo color='white' />
      <h1>{`${API_URL.owner} / ${API_URL.repo}`}</h1>
    </Header>
  );
};

const Header = styled.header`
  text-align: center;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 8px;
  justify-content: center;

  h1 {
    font-size: 20px;
    color: #f0f6fc;
  }
`;

export default CommonHeader;
