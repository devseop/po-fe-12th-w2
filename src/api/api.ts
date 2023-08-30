import { Octokit } from '@octokit/rest';
import { API_URL } from '../constant/urls';
import { IIssue, IOptions } from '../types/type';

const octokit = new Octokit({
  uth: process.env.PRIVATE_GIT_TOKEN,
});

const fetchIssuesFromApi = async (options: IOptions) => {
  const { owner, repo, lastIssueNumber, page } = options;

  const res = await octokit.issues.listForRepo({
    owner,
    repo,
    state: 'open',
    sort: 'comments',
    direction: 'desc',
    per_page: 10,
    page: page || Math.floor((lastIssueNumber || 0) / 10) + 1,
  });

  const issues: IIssue[] = (res.data || []).map((data) => ({
    issueNumber: data.number,
    title: data.title,
    author: data.user?.login,
    createdDate: data.created_at,
    commentCount: data.comments,
  }));

  return issues;
};

export const fetchIssues = async (lastIssueNumber?: number) => {
  try {
    return await fetchIssuesFromApi({
      owner: API_URL.owner,
      repo: API_URL.repo,
      lastIssueNumber,
    });
  } catch (err) {
    console.error(err);
    return [];
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
