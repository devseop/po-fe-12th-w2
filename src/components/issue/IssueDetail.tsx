import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CommonHeader from '../CommonHeader';
import MarkdownRenderer from '../MarkdownRenderer';

import { useIssueContext } from '../../context/IssueContext';
import { fetchIssueDetail } from '../../api/api';
import { IIssue } from '../../types/type';
import { converDate } from '../../utils/convertDateToKr';

import { styled } from 'styled-components';
import { GoComment } from 'react-icons/go';

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
            <Comment>
              <GoComment />
              <span>{issue.commentCount}</span>
            </Comment>
          </DescWrapper>
          <Desc>
            opened on {converDate(issue.createdDate)} by {issue.author}
          </Desc>
          <MarkdownRenderer content={issue.body} />
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
  padding: 0 20px 12px 16px;
  display: flex;
  align-items: flex-start;
  gap: 16px;
`;

const TitleWrapper = styled.div`
  display: flex;
  gap: 12px;
  justify-content: space-between;
  align-items: flex-start;
`;

const AuthorProfile = styled.img`
  width: 48px;
  height: 48px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 50%;
`;

const Title = styled.h1`
  font-size: 16px;
  font-weight: 700;
  word-wrap: break-word;
`;

const Comment = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;

  span {
    font-size: 12px;
    text-align: right;
  }
`;

const Desc = styled.span`
  padding: 0 20px;
  color: rgba(255, 255, 255, 0.6);
  font-size: 12px;
`;

export default IssueDetail;
