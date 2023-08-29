import React from 'react';
import { API_URL } from '../constant/urls';

const CommonHeader = () => {
  return <header>{`${API_URL.owner}/${API_URL.repo}`}</header>;
};

export default CommonHeader;
