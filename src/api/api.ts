import { Octokit } from '@octokit/rest';
import { API_URL } from '../constant/urls';

const octokit = new Octokit({
  uth: process.env.PRIVATE_GIT_TOKEN,
});

export const fetchIssues = async () => {
  try {
    const res = await octokit.issues.listForRepo({
      owner: API_URL.owner,
      repo: API_URL.repo,
      state: 'open',
      sort: 'comments',
      direction: 'desc',
      per_page: 10,
    });
    console.log(res.data);
    return res.data;
  } catch (err) {
    console.error(err);
  }
};
