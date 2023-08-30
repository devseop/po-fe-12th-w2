import React from 'react';
import { Link } from 'react-router-dom';
import AdBanner from '../AdBanner';
import { IIssue } from '../../types/type';
import { converDate } from '../../utils/convertDateToKr';
import { styled } from 'styled-components';
import { GoIssueOpened, GoComment } from 'react-icons/go';

interface IIssueItem {
  issue: IIssue;
  index: number;
}

const IssueItem = ({ issue, index }: IIssueItem) => {
  const { issueNumber, title, author, createdDate, commentCount } = issue;

  return (
    <>
      {index !== 0 && (index + 1) % 5 === 0 ? <AdBanner /> : null}
      <Link to={`issues/${issueNumber}`}>
        <ItemWrapper>
          <GoIssueOpened color='#3fb950' />
          <DescWrapper>
            <TitleWrapper>
              <Title>
                #{issueNumber} {title}
              </Title>
              <Comment>
                <GoComment />
                <span>{commentCount}</span>
              </Comment>
            </TitleWrapper>
            <Desc>
              opened on {converDate(createdDate)} by {author}
            </Desc>
          </DescWrapper>
        </ItemWrapper>
      </Link>
    </>
  );
};

const ItemWrapper = styled.li`
  display: flex;
  gap: 16px;
  padding: 0 20px 16px;
  border-bottom: 1px solid black;
  cursor: pointer;
`;

const DescWrapper = styled.div`
  width: 100%;
`;

const TitleWrapper = styled.article`
  display: flex;
  gap: 12px;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
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
  color: rgba(255, 255, 255, 0.6);
  font-size: 12px;
`;

export default IssueItem;
