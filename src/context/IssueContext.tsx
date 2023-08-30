import React, { Dispatch, createContext, useContext, useReducer } from 'react';
import { IIssue, IState } from '../types/type';

type IFetchAction =
  | { type: 'FETCH_ISSUES_START' }
  | { type: 'FETCH_ISSUES_SUCCESS'; payload: IIssue[]; totalIssues: number }
  | { type: 'FETCH_ISSUES_FAILURE'; payload: Error }
  | { type: 'FETCH_ISSUE_DETAIL_SUCCESS'; payload: IIssue }
  | { type: 'FETCH_MORE_ISSUES_SUCCESS'; payload: IIssue[] };

type DispatchType = Dispatch<IFetchAction>;

const issueContext = createContext<{ state: IState; dispatch: DispatchType } | undefined>(
  undefined,
);

const issueReducer = (state: IState, action: IFetchAction): IState => {
  switch (action.type) {
    case 'FETCH_ISSUES_START':
      return { ...state, isLoading: true, isError: null };
    case 'FETCH_ISSUES_SUCCESS':
      return {
        ...state,
        isLoading: false,
        issues: action.payload,
        totalIssues: action.totalIssues,
      };
    case 'FETCH_ISSUES_FAILURE':
      return { ...state, isLoading: false, isError: action.payload };
    case 'FETCH_ISSUE_DETAIL_SUCCESS':
      return { ...state, isLoading: false, issues: [action.payload] };
    case 'FETCH_MORE_ISSUES_SUCCESS':
      return {
        ...state,
        isLoading: false,
        issues: [...state.issues, ...action.payload],
      };
    default:
      return state;
  }
};

export const IssueProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(issueReducer, {
    issues: [],
    isLoading: false,
    isError: null,
    totalIssues: 0,
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
