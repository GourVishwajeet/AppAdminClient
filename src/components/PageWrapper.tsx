import type { FC, ReactNode } from 'react';

interface PageWrapperProps {
  children: ReactNode;
  className?: string;
}

export const PageWrapper: FC<PageWrapperProps> = ({
  children,
  className = '',
}) => {
  return (
    <div
      className={`min-h-screen opacity-0 page-animate overflow-auto flex flex-col bg-[#4D54640D] ${className}`}
    >
      {children}
    </div>
  );
};
