import React, { FC, HTMLAttributes } from 'react';
import { IWidth } from '../util/getWidth';
import { StyledContainer } from './styles/container.styles';

export interface IContainer extends HTMLAttributes<HTMLElement> {
  width?: IWidth;
}

const Container: FC<IContainer> = ({
  children,
  width = 'default',
  ...props
}) => {
  return (
    <StyledContainer width={width} {...props}>
      {children}
    </StyledContainer>
  );
};

export { Container };
