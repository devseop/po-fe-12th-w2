import React from 'react';
import { keyframes, styled } from 'styled-components';

const IsLoading = () => {
  return (
    <Item>
      <div>
        <Img />
      </div>
      <Wrapper>
        <Title />
        <Desc />
      </Wrapper>
    </Item>
  );
};

const LoadingAnimation = keyframes`
  0% {
    transform: translateX(0);
  }
  50%,
  100% {
    transform: translateX(460px);
  }
`;

const Item = styled.li`
  display: flex;
  gap: 16px;
  align-items: flex-start;
  padding: 0 20px 16px;
  margin: 0 0 16px 0;
  position: relative;
  border-bottom: 1px solid black;
`;

const Img = styled.div`
  width: 16px;
  height: 16px;
  border-radius: 100%;
  background: #f2f2f2;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 30px;
    height: 100%;
    background: linear-gradient(to right, #f2f2f2, #ddd, #f2f2f2);
    animation: ${LoadingAnimation} 2s infinite linear;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  gap: 16px;
  flex-direction: column;
  align-items: flex-start;
`;

const Title = styled.p`
  margin: 0;
  width: 100%;
  height: 16px;
  border-radius: 2px;
  background: #f2f2f2;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 30px;
    height: 100%;
    background: linear-gradient(to right, #f2f2f2, #ddd, #f2f2f2);
    animation: ${LoadingAnimation} 2s infinite linear;
  }
`;

const Desc = styled.p`
  width: 85%;
  height: 12px;
  margin: 0;
  border-radius: 2px;
  background: #f2f2f2;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 30px;
    height: 100%;
    background: linear-gradient(to right, #f2f2f2, #ddd, #f2f2f2);
    animation: ${LoadingAnimation} 2s infinite linear;
  }
`;

export default IsLoading;
