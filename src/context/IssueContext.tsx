import React, { Dispatch, createContext, useContext, useReducer } from 'react';

export interface IIssue {
  issueNumber: number;
  title: string;
  author: string;
  createdDate: string;
  commentCount: number;
}

interface IState {
  issues: IIssue[];
  isLoading: boolean;
  isError: Error | null;
}

type FetchAction =
  | { type: 'FETCH_ISSUES_START' }
  | { type: 'FETCH_ISSUES_SUCCESS'; payload: IIssue[] }
  | { type: 'FETCH_ISSUES_FAILURE'; payload: Error };

type DispatchType = Dispatch<FetchAction>;

const issueContext = createContext<{ state: IState; dispatch: DispatchType } | undefined>(
  undefined,
);

const issueReducer = (state: IState, action: FetchAction): IState => {
  switch (action.type) {
    case 'FETCH_ISSUES_START':
      return { ...state, isLoading: true, isError: null };
    case 'FETCH_ISSUES_SUCCESS':
      return { ...state, isLoading: false, issues: action.payload };
    case 'FETCH_ISSUES_FAILURE':
      return { ...state, isLoading: false, isError: action.payload };
    default:
      return state;
  }
};

export const IssueProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(issueReducer, {
    issues: [],
    isLoading: false,
    isError: null,
  });

  return <issueContext.Provider value={{ state, dispatch }}>{children}</issueContext.Provider>;
};

export const useIssueContext = () => {
  const context = useContext(issueContext);
  if (context === undefined) {
    throw new Error('useIssueContext must be used within an IssueProvider');
  }

  return context;
};
