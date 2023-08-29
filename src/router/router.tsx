import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from '../App';
import IssueDetail from '../components/IssueDetail';
import { IssueProvider } from '../context/IssueContext';

const Router = () => {
  return (
    <BrowserRouter>
      <IssueProvider>
        <Routes>
          <Route path='/' element={<App />} />
          <Route path='/issues/:issueNumber' element={<IssueDetail />} />
        </Routes>
      </IssueProvider>
    </BrowserRouter>
  );
};

export default Router;
