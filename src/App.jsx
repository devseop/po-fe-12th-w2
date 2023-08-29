import React from 'react';
import CommonHeader from './components/CommonHeader';
import IssueList from './components/IssueList';
import { IssueProvider } from './context/IssueContext';

function App() {
  return (
    <IssueProvider>
      <CommonHeader />
      <IssueList />
    </IssueProvider>
  );
}

export default App;
