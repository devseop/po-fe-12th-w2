import { Octokit } from '@octokit/rest';
import { API_URL } from '../constant/urls';
import { IIssue } from '../types/type';

const octokit = new Octokit({
  uth: process.env.PRIVATE_GIT_TOKEN,
});

export const fetchIssues = async (lastIssueNumber?: number) => {
  try {
    if (lastIssueNumber !== undefined) {
      const res = await octokit.issues.listForRepo({
        owner: API_URL.owner,
        repo: API_URL.repo,
        state: 'open',
        sort: 'comments',
        direction: 'desc',
        per_page: 10,
        page: Math.floor((lastIssueNumber + 1) / 10) + 1,
      });
      const newIssues: IIssue[] = (res.data || []).map((data) => ({
        issueNumber: data.number,
        title: data.title,
        author: data.user?.login,
        createdDate: data.created_at,
        commentCount: data.comments,
      }));
      return newIssues;
    } else {
      const res = await octokit.issues.listForRepo({
        owner: API_URL.owner,
        repo: API_URL.repo,
        state: 'open',
        sort: 'comments',
        direction: 'desc',
        per_page: 10,
      });
      const issues: IIssue[] = (res.data || []).map((data) => ({
        issueNumber: data.number,
        title: data.title,
        author: data.user?.login,
        createdDate: data.created_at,
        commentCount: data.comments,
      }));
      return issues;
    }
  } catch (err) {
    console.error(err);
  }
};

export const fetchIssueDetail = async (issueNumber: number) => {
  try {
    const res = await octokit.issues.get({
      owner: API_URL.owner,
      repo: API_URL.repo,
      issue_number: issueNumber,
    });
    const issueDetail: IIssue = {
      issueNumber: res.data.number,
      title: res.data.title,
      author: res.data.user?.login,
      profileImage: res.data.user?.avatar_url,
      createdDate: res.data.created_at,
      commentCount: res.data.comments,
      body: res.data.body,
    };
    return issueDetail;
  } catch (err) {
    console.error(err);
  }
};

export const getTotalIssues = async () => {
  try {
    const res = await octokit.repos.get({
      owner: API_URL.owner,
      repo: API_URL.repo,
    });
    return res.data.open_issues;
  } catch (err) {
    console.error(err);
    return undefined;
  }
};
