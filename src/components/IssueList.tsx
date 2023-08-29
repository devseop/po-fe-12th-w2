import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IIssue, useIssueContext } from '../context/IssueContext';
import { fetchIssues } from '../api/api';

const IssueList = () => {
  const { state, dispatch } = useIssueContext();

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_ISSUES_START' });

      try {
        const issuesFromApi = await fetchIssues();
        const issues: IIssue[] = (issuesFromApi || []).map((data: any) => ({
          issueNumber: data.number,
          title: data.title,
          author: data.user.login,
          createdDate: data.created_at,
          commentCount: data.comments,
        }));
        dispatch({ type: 'FETCH_ISSUES_SUCCESS', payload: issues });
      } catch (err: any) {
        dispatch({ type: 'FETCH_ISSUES_FAILURE', payload: err });
      }
    };
    fetchData();
  }, [dispatch]);

  return (
    <>
      {state.isLoading ? (
        <p>is Loading...</p>
      ) : state.isError ? (
        <p>Error: {state.isError.message}</p>
      ) : (
        <div>
          <ul>
            {state.issues.map((issue) => (
              <li key={issue.issueNumber}>
                <Link to={`issues/${issue.issueNumber}`}>
                  <p>번호: {issue.issueNumber}</p>
                  <p>이슈명: {issue.title}</p>
                  <p>작성자: {issue.author}</p>
                  <p>작성일: {issue.createdDate}</p>
                  <p>댓글: {issue.commentCount}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default IssueList;
