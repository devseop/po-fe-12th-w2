export interface IIssue {
  issueNumber: number;
  title: string;
  author: string;
  createdDate: string;
  commentCount: number;
}

export interface IState {
  issues: IIssue[];
  isLoading: boolean;
  isError: Error | null;
}
