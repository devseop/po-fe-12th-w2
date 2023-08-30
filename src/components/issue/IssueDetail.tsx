import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CommonHeader from '../CommonHeader';
import MarkdownRenderer from '../MarkdownRenderer';

import { useIssueContext } from '../../context/IssueContext';
import { fetchIssueDetail } from '../../api/api';
import { IIssue } from '../../types/type';
import { converDate } from '../../utils/convertDateToKr';

import { styled } from 'styled-components';

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
    <>
      <CommonHeader />
      {issue ? (
        <Wrapper>
          <DescWrapper>
            <TitleWrapper>
              <AuthorProfile src={issue.profileImage} alt={issue.author} />
              <Title>
                #{issue.issueNumber} {issue.title}
              </Title>
            </TitleWrapper>
            <Desc>
              opened on {converDate(issue.createdDate)} by {issue.author} · {issue.commentCount}{' '}
              comments
            </Desc>
          </DescWrapper>
          <Content>{issue.body && <MarkdownRenderer content={issue.body} />}</Content>
        </Wrapper>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

const Wrapper = styled.div`
  color: white;
`;

const DescWrapper = styled.header`
  padding: 0 20px 20px 16px;
  margin-bottom: 18px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  border-bottom: 1px solid black;
`;

const TitleWrapper = styled.div`
  display: flex;
  gap: 12px;
  justify-content: space-between;
  align-items: center;
`;

const AuthorProfile = styled.img`
  width: 48px;
  height: 48px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 4px;
`;

const Title = styled.h1`
  font-size: 16px;
  font-weight: 700;
  word-wrap: break-word;
`;

const Desc = styled.span`
  color: rgba(255, 255, 255, 0.6);
  font-size: 12px;
`;

const Content = styled.article`
  padding: 0 20px;
  margin-bottom: 28px;
`;

export default IssueDetail;
