import React, { useEffect } from 'react';
import { useIssueContext } from '../../context/IssueContext';
import { fetchIssues, getTotalIssues } from '../../api/api';
import { IIssue } from '../../types/type';
import useInfinityScroll from '../../hooks/useInfinityScroll';
import { styled } from 'styled-components';
import IssueItem from './IssueItem';

const IssueList = () => {
  const { state, dispatch } = useIssueContext();

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_ISSUES_START' });
      try {
        const issuesFromApi = await fetchIssues();
        const totalIssuesFromApi = await getTotalIssues();
        if (typeof totalIssuesFromApi === 'number') {
          dispatch({
            type: 'FETCH_ISSUES_SUCCESS',
            payload: issuesFromApi as IIssue[],
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
        dispatch({ type: 'FETCH_MORE_ISSUES_SUCCESS', payload: newIssuesFromApi as IIssue[] });
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
        <section>
          <ListWrapper>
            {state.issues.map((issue: IIssue, index: number) => (
              <IssueItem issue={issue} index={index} key={issue.issueNumber} />
            ))}
          </ListWrapper>
          <div ref={refForInfinityScroll} />
        </section>
      )}
    </>
  );
};

const ListWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 16px;

  a {
    color: white;
    text-decoration: none;
  }
`;

export default IssueList;
