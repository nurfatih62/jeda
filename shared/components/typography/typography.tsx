import type { ReactNode, ElementType } from 'react';

export type TypographyVariant =
  | 'logo'
  | 'heading'
  | 'subheading'
  | 'articleTitle'
  | 'body'
  | 'button'
  | 'metaName'
  | 'metaDate'
  | 'caption';

interface VariantStyle {
  as: ElementType;
  className: string;
}

const variantMap: Record<TypographyVariant, VariantStyle> = {
  logo: {
    as: 'span',
    className: "font-serif text-2xl font-bold leading-7 text-primary",
  },
  heading: {
    as: 'h1',
    className: "font-sans text-4xl font-bold leading-[1.3] text-text-primary",
  },
  subheading: {
    as: 'p',
    className:
      "font-sans text-2xl font-medium leading-7 text-text-muted",
  },
  articleTitle: {
    as: 'h2',
    className: "font-sans text-2xl font-bold leading-6.5 text-text-primary",
  },
  body: {
    as: 'p',
    className:
      "font-sans text-base font-medium leading-6 text-text-muted",
  },
  button: {
    as: 'span',
    className: "font-sans text-base font-medium leading-6",
  },
  metaName: {
    as: 'span',
    className:
      "font-sans text-sm font-bold leading-7 text-text-muted",
  },
  metaDate: {
    as: 'span',
    className:
      "font-sans text-sm font-medium leading-7 text-text-muted",
  },
  caption: {
    as: 'span',
    className: "font-nunito text-sm font-medium leading-5 text-placeholder",
  },
};

export interface TypographyProps {
  variant: TypographyVariant;
  children: ReactNode;
  className?: string;
}

export function Typography({ variant, children, className = '' }: TypographyProps) {
  const { as: Component, className: variantClassName } = variantMap[variant];
  return <Component className={`${variantClassName} ${className}`}>{children}</Component>;
}
