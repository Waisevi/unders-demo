import { style } from '@vanilla-extract/css';
import clsx from 'clsx';
import { ComponentPropsWithoutRef, createElement, forwardRef, JSX } from 'react';

export const styled = <T extends keyof JSX.IntrinsicElements>(
  tag: T,
  styles: Parameters<typeof style>[0],
) => {
  const className = style(styles);

  const Component = forwardRef<HTMLElement, ComponentPropsWithoutRef<T>>((props, ref) =>
    createElement(tag, {
      ...props,
      ref,
      className: clsx(className, props.className),
    }),
  );

  Component.displayName = `styled(${tag})`;
  return Component;
};
