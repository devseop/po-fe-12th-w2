import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useIssueContext } from '../context/IssueContext';
import { fetchIssues, getTotalIssues } from '../api/api';
import { IIssue } from '../types/type';
import AdBanner from './AdBanner';
import useInfinityScroll from '../hooks/useInfinityScroll';
import { converDateToKr } from '../utils/convertDateToKr';

const IssueList = () => {
  const { state, dispatch } = useIssueContext();

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_ISSUES_START' });
      //TODO: data, err 타입을 any이 아닌 다른 타입으로 어떻게 했는지 팀원들한테 물어보기
      try {
        const issuesFromApi = await fetchIssues();
        const totalIssuesFromApi = await getTotalIssues();
        if (typeof totalIssuesFromApi === 'number') {
          const issues: IIssue[] = (issuesFromApi || []).map((data: any) => ({
            issueNumber: data.number,
            title: data.title,
            author: data.user.login,
            createdDate: data.created_at,
            commentCount: data.comments,
          }));
          dispatch({
            type: 'FETCH_ISSUES_SUCCESS',
            payload: issues,
            totalIssues: totalIssuesFromApi,
          });
        }
      } catch (err: any) {
        dispatch({ type: 'FETCH_ISSUES_FAILURE', payload: err });
      }
    };
    fetchData();
  }, [dispatch]);

  const loadMoreIssues = async () => {
    if (state.isLoading || state.issues.length === state.totalIssues) {
      return;
    }
    try {
      const lastIssueNumber = state.issues.length - 1;
      if (lastIssueNumber !== undefined) {
        const newIssuesFromApi = await fetchIssues(lastIssueNumber + 1);
        const newIssues: IIssue[] = (newIssuesFromApi || []).map((data: any) => ({
          issueNumber: data.number,
          title: data.title,
          author: data.user.login,
          createdDate: data.created_at,
          commentCount: data.comments,
        }));
        dispatch({ type: 'FETCH_MORE_ISSUES_SUCCESS', payload: newIssues });
      }
    } catch (err: any) {
      dispatch({ type: 'FETCH_ISSUES_FAILURE', payload: err });
    }
  };

  const refForInfinityScroll = useInfinityScroll(loadMoreIssues);

  return (
    <>
      {state.isLoading ? (
        <p>is Loading...</p>
      ) : state.isError ? (
        <p>Error: {state.isError.message}</p>
      ) : (
        <div>
          <ul>
            {state.issues.map((issue: IIssue, index) => (
              <li key={issue.issueNumber}>
                {index !== 0 && (index + 1) % 5 === 0 ? <AdBanner /> : null}
                <Link to={`issues/${issue.issueNumber}`}>
                  <p>이슈번호: {issue.issueNumber}</p>
                  <p>이슈제목: {issue.title}</p>
                  <p>작성자: {issue.author}</p>
                  <p>작성일: {converDateToKr(issue.createdDate)}</p>
                  <p>코멘트: {issue.commentCount}</p>
                </Link>
              </li>
            ))}
          </ul>
          <div ref={refForInfinityScroll} />
        </div>
      )}
    </>
  );
};

export default IssueList;
