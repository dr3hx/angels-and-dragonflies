'use client';

import React from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';

type Props = {
  children: React.ReactNode;
  className?: string;
  href: string;
  onClick?: () => void;
  onMouseEnter?: () => void;
  target?: string;
};

const Link: React.FC<Props> = ({ children, className, href, onClick, onMouseEnter, target }) => {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      e.preventDefault();
      onClick();
    } else if (target !== '_blank') {
      e.preventDefault();
      router.push(href);
    }
  };

  if (target === '_blank') {
    return (
      <a href={href} className={className} target={target} rel="noopener noreferrer">
        {children}
      </a>
    );
  }

  return (
    <NextLink href={href} className={className} onClick={handleClick} onMouseEnter={onMouseEnter}>
      {children}
    </NextLink>
  );
};

export default Link;
