import React from 'react';
import CommonHeader from './components/CommonHeader';
import IssueList from './components/issue/IssueList';
import './style.css';

function App() {
  return (
    <>
      <CommonHeader />
      <IssueList />
    </>
  );
}

export default App;
