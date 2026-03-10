import { cn } from '@/lib/utils';
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
    size?: 'sm' | 'md' | 'lg';
    isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', size = 'md', isLoading, children, ...props }, ref) => {
        const variants = {
            primary: 'bg-primary-600 text-white hover:bg-primary-700 shadow-sm',
            secondary: 'bg-slate-100 text-slate-900 hover:bg-slate-200',
            outline: 'border border-slate-200 bg-transparent hover:bg-slate-50 text-slate-600',
            ghost: 'bg-transparent hover:bg-slate-100 text-slate-600',
            danger: 'bg-red-500 text-white hover:bg-red-600',
        };

        const sizes = {
            sm: 'h-8 px-3 text-xs',
            md: 'h-10 px-4 text-sm',
            lg: 'h-12 px-6 text-base',
        };

        return (
            <button
                ref={ref}
                disabled={isLoading || props.disabled}
                className={cn(
                    'inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 disabled:opacity-50 disabled:pointer-events-none',
                    variants[variant],
                    sizes[size],
                    className
                )}
                {...props}
            >
                {isLoading ? (
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                ) : null}
                {children}
            </button>
        );
    }
);
Button.displayName = 'Button';

export const Card = ({ className, children }: { className?: string; children: React.ReactNode }) => (
    <div className={cn('bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden', className)}>
        {children}
    </div>
);

export const Badge = ({ className, children, variant = 'default' }: { className?: string; children: React.ReactNode; variant?: 'default' | 'success' | 'warning' | 'danger' | 'info' }) => {
    const styles = {
        default: 'bg-slate-100 text-slate-700',
        success: 'bg-emerald-50 text-emerald-700 border-emerald-100',
        warning: 'bg-amber-50 text-amber-700 border-amber-100',
        danger: 'bg-red-50 text-red-700 border-red-100',
        info: 'bg-primary-50 text-primary-700 border-primary-100',
    };
    return (
        <span className={cn('inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border', styles[variant], className)}>
            {children}
        </span>
    );
};


interface AvatarProps {
  src?: string;
  initials: string;
  className?: string;
}


export const Avatar = ({ src, initials, className }: AvatarProps) => (
  <div
    className={cn(
      "flex items-center justify-center rounded-full overflow-hidden border border-primary-200 bg-primary-100 text-primary-700 font-semibold",
      className
    )}
  >
    {src ? (
      <img
        src={src}
        alt="avatar"
        className="w-full h-full object-cover"
      />
    ) : (
      initials
    )}
  </div>
);