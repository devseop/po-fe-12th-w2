import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useIssueContext } from '../context/IssueContext';
import { fetchIssueDetail } from '../api/api';
import { IIssue } from '../types/type';
import CommonHeader from './CommonHeader';
import { converDateToKr } from '../utils/convertDateToKr';

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

  return (
    <div>
      <CommonHeader />
      {issue ? (
        <div>
          <p>이슈번호: {issue.issueNumber}</p>
          <p>이슈제목: {issue.title}</p>
          <img src={issue.profileImage} alt={issue.author} />
          <p>작성자: {issue.author}</p>
          <p>작성일: {converDateToKr(issue.createdDate)}</p>
          <p>댓글: {issue.commentCount}</p>
          <p>본문: {issue.body}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default IssueDetail;
