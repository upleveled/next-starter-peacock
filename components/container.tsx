import { FC, HTMLAttributes } from 'react';
import { cn } from '../utils/cn';

export type IWidth = 'default' | 'bleed' | 'narrow';
export interface IContainer extends HTMLAttributes<HTMLElement> {
  width?: IWidth;
}

const getMaxWidth = (width: IWidth) => {
  switch (width) {
    case 'bleed':
      return 'max-w-full px-4 lg:max-w-[90%] lg:px-0';

    case 'default':
    default:
      return 'max-w-6xl';

    case 'narrow':
      return 'max-w-4xl';
  }
};

const Container: FC<IContainer> = ({
  children,
  width = 'default',
  className,
  ...rest
}) => {
  const maxWidth = getMaxWidth(width);

  return (
    <section
      className={cn(
        'my-0 mx-auto py-0 px-[4%] xl:px-0' /** px-[4%] */,
        className,
        maxWidth,
      )}
      {...rest}
    >
      {children}
    </section>
  );
};

export { Container };
