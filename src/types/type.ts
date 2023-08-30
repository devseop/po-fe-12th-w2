export interface IIssue {
  issueNumber: number;
  title: string;
  author: string | undefined;
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
