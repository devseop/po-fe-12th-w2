import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useIssueContext } from '../context/IssueContext';
import { fetchIssues } from '../api/api';
import { IIssue } from '../types/type';

const IssueList = () => {
  const { state, dispatch } = useIssueContext();

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_ISSUES_START' });
      //TODO: data, err 타입을 any이 아닌 다른 타입으로 설정할 수 있는지 알아보고 수정하기
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
            {state.issues.map((issue: IIssue) => (
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
