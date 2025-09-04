import { ReactNode } from 'react';
import clsx from 'clsx';
import { MarkdownText } from '../MarkdownText/MarkdownText';

export type CardWithContent = {
  title?: string;
  markdownText?: string;
};

export function CardWithContentRedesign({
  title,
  children,
  markdownText,
  className,
}: CardWithContent & {
  className: string;
  children: ReactNode;
}) {
  return (
    <div className={clsx(`card-with-content-redesign`, className)}>
      {title && <h3 className="card-with-content-redesign__title">{title}</h3>}
      {children}
      {markdownText && (
        <MarkdownText
          className="card-with-content-redesign__markdown"
          isTargetBlank
        >
          {markdownText}
        </MarkdownText>
      )}
    </div>
  );
}
