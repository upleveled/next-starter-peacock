import type { AllHTMLAttributes } from 'react';
import { cn } from '../utils/cn';

export function NativeLink({
  className,
  ...rest
}: AllHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a className={cn('text-primary', className)} {...rest} title="Link">
      {rest.children}
    </a>
  );
}
