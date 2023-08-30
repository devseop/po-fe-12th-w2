import React from 'react';
import { Link } from 'react-router-dom';
import { AD_URL } from '../constant/urls';
import { styled } from 'styled-components';

const AdBanner = () => {
  return (
    <Banner>
      <Link to={AD_URL.to}>
        <img src={AD_URL.img} alt='광고' />
      </Link>
    </Banner>
  );
};

const Banner = styled.div`
  display: flex;
  justify-content: center;
  background-color: white;
  cursor: pointer;
`;

export default AdBanner;
