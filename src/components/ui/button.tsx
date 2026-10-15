import Link from 'next/link';
import { cn } from '@/lib/utils';

const base =
  'inline-flex items-center justify-center gap-2 font-medium transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer disabled:opacity-50 disabled:pointer-events-none';

export const buttonVariants = {
  primary: 'bg-brand text-white hover:bg-brand-hover shadow-xs font-semibold',
  secondary:
    'bg-surface text-secondary border border-secondary/35 hover:bg-secondary-subtle hover:border-secondary shadow-xs',
  outline:
    'bg-surface text-ink border border-line hover:border-brand hover:text-brand shadow-xs',
  transparent:
    'bg-transparent text-ink border border-line hover:border-brand hover:text-brand hover:bg-surface-muted/60 transition-colors shadow-none',
  ghost: 'text-ink-muted hover:text-ink hover:bg-surface-muted',
} as const;

export const buttonSizes = {
  sm: 'h-8 px-3 text-xs rounded-[8px]',
  md: 'h-9 px-4 text-xs sm:text-sm rounded-[8px]',
  lg: 'h-11 px-6 text-sm sm:text-base rounded-[8px]',
  header: 'h-9 px-3.5 text-xs font-medium rounded-[8px]',
} as const;

export type ButtonVariant = keyof typeof buttonVariants;
export type ButtonSize = keyof typeof buttonSizes;

type ButtonBaseProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  onClick?: React.MouseEventHandler;
  children: React.ReactNode;
};

type ButtonAsButton = ButtonBaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps> & {
    href?: undefined;
  };

type ButtonAsLink = ButtonBaseProps & {
  href: string;
  external?: boolean;
};

export type ButtonProps = ButtonAsButton | ButtonAsLink;

export function Button(props: ButtonProps) {
  const { variant = 'primary', size = 'md', className, onClick, children } = props;
  const classes = cn(base, buttonVariants[variant], buttonSizes[size], className);

  if ('href' in props && props.href !== undefined) {
    const { href, external } = props;
    if (external || href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')) {
      return (
        <a
          href={href}
          className={classes}
          target={external ? '_blank' : undefined}
          rel={external ? 'noopener noreferrer' : undefined}
          onClick={onClick}
        >
          {children}
        </a>
      );
    }

    return (
      <Link href={href} className={classes} onClick={onClick}>
        {children}
      </Link>
    );
  }

  const { type = 'button', disabled } = props as ButtonAsButton;
  return (
    <button type={type} disabled={disabled} className={classes} onClick={onClick}>
      {children}
    </button>
  );
}
