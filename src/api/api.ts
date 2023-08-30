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
      // console.log(res.data ? '✅ res OK' : '❌ res FAILURE');
      return res.data;
    } else {
      const res = await octokit.issues.listForRepo({
        owner: API_URL.owner,
        repo: API_URL.repo,
        state: 'open',
        sort: 'comments',
        direction: 'desc',
        per_page: 10,
      });
      return res.data;
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
    // console.log('res.data', res.data);
    const issueDetail: IIssue = {
      issueNumber: res.data.number,
      title: res.data.title,
      author: res.data.user?.login,
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
