export interface IIssue {
  issueNumber: number;
  title: string;
  author: string | undefined;
  profileImage?: string;
  createdDate: string;
  commentCount: number;
  body?: string | null | undefined;
}

export interface IState {
  issues: IIssue[];
  isLoading: boolean;
  isError: Error | null;
  totalIssues?: number;
}

export interface IOptions {
  owner: string;
  repo: string;
  lastIssueNumber?: number;
  page?: number;
}
