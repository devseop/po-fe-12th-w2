import React from 'react';
import { Link } from 'react-router-dom';
import { AD_URL } from '../constant/urls';

const AdBanner = () => {
  return (
    <Link to={AD_URL.to}>
      <img src={AD_URL.img} alt='광고' />
    </Link>
  );
};

export default AdBanner;
