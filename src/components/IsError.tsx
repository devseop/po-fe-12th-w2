import React from 'react';
import { styled } from 'styled-components';
import ic_error from '../assets/ic_error.svg';

const IsError = ({ error }: { error: string }) => {
  return (
    <Wrapper>
      <ErrorImage src={ic_error} alt='에러' />
      <ErrorText>{error}</ErrorText>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  margin: 50% 0;
`;

const ErrorImage = styled.img`
  width: 30vw;
  height: 30vw;
  object-fit: cover;
  margin: 0 auto;
`;

const ErrorText = styled.p`
  color: white;
  width: 100vw;
  font-size: 18px;
  font-weight: 700;
  text-align: center;
`;

export default IsError;
