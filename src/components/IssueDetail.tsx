import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useIssueContext } from '../context/IssueContext';
import { fetchIssueDetail } from '../api/api';
import { IIssue } from '../types/type';

const IssueDetail = () => {
  const { state, dispatch } = useIssueContext();
  const { issueNumber } = useParams<{ issueNumber: string }>();

  useEffect(() => {
    const fetchIssueData = async () => {
      dispatch({ type: 'FETCH_ISSUES_START' });

      try {
        const issueDetail = await fetchIssueDetail(Number(issueNumber));
        dispatch({ type: 'FETCH_ISSUE_DETAIL_SUCCESS', payload: issueDetail as IIssue });
      } catch (err: any) {
        dispatch({ type: 'FETCH_ISSUES_FAILURE', payload: err });
      }
    };
    fetchIssueData();
  }, [issueNumber, dispatch]);

  const issue = state.issues.find((issue) => issue.issueNumber === Number(issueNumber));

  // console.log('issue', issue);

  return (
    <div>
      <h1>Issue Detail</h1>
      {issue ? (
        <div>
          <p>번호: {issue.issueNumber}</p>
          <p>이슈명: {issue.title}</p>
          <p>작성자: {issue.author}</p>
          <p>작성일: {issue.createdDate}</p>
          <p>본문: {issue.body}</p>
          <p>댓글: {issue.commentCount}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default IssueDetail;
