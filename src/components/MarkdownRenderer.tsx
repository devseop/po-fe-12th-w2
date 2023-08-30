import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeKatex from 'rehype-katex';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { styled } from 'styled-components';

interface IMarkDownRendererProps {
  content: string;
}

const MarkdownRenderer = ({ content }: IMarkDownRendererProps) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeKatex]}
      components={{
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || '');
          return !inline && match ? (
            <SyntaxHighlighter {...props} style={vscDarkPlus} language={match[1]} PreTag='div'>
              {String(children).replace(/\n$/, '')}
            </SyntaxHighlighter>
          ) : (
            <Code {...props} className={className}>
              {children}
            </Code>
          );
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
};

const Code = styled.code`
  border-radius: 4px;
  padding: 16px;
  font-size: 14px;
`;

export default MarkdownRenderer;
