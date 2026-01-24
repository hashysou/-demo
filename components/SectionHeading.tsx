import React from 'react';

type Align = 'left' | 'center' | 'split';
type Variant = 'plain' | 'eyebrow' | 'subtitled' | 'ruled';
type TitleFlow = 'horizontal' | 'vertical';

export type SectionHeadingProps = {
  id: string;
  align?: Align;
  variant?: Variant;
  titleFlow?: TitleFlow;
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  meta?: string;
  actions?: React.ReactNode;
  className?: string;
};

const SectionHeading: React.FC<SectionHeadingProps> = ({
  id,
  align = 'left',
  variant = 'plain',
  titleFlow = 'horizontal',
  eyebrow,
  title,
  subtitle,
  meta,
  actions,
  className = '',
}) => {
  const isSplitVertical = align === 'split' && titleFlow === 'vertical';

  const headerClasses = [
    'font-sans text-[#111] relative isolate group scroll-m-[80px]',
    align === 'center' && 'text-center flex flex-col items-center',
    align === 'split' && 'grid grid-cols-1 gap-4 md:gap-x-8 md:gap-y-6',
    isSplitVertical && 'md:grid-cols-[auto_auto_1fr]',
    className,
  ].filter(Boolean).join(' ');

  return (
    <header className={headerClasses} id={id}>
      {eyebrow && (
        <small className={[
          'block text-sm font-medium text-[#666] [&_[lang=en]]:tracking-[.04em] [&_[lang=en]]:uppercase',
          isSplitVertical ? 'md:col-start-2 md:row-start-1 md:row-span-3' : 'mb-3',
          titleFlow === 'vertical' && 'md:[writing-mode:vertical-rl] md:[text-orientation:mixed]'
        ].join(' ')}>
          {eyebrow}
        </small>
      )}
      <h2 className={[
        'font-serif font-semibold text-[clamp(1.375rem,1.05rem_+_1vw,1.95rem)] leading-snug',
        isSplitVertical ? 'mb-0 md:col-start-1 md:row-start-1 md:row-span-3 md:justify-self-start' : 'mb-4',
        titleFlow === 'vertical' && 'md:[writing-mode:vertical-rl] md:[text-orientation:mixed]'
      ].filter(Boolean).join(' ')}>
        {title}
      </h2>
      {subtitle && (
        <div className={[
          'leading-loose max-w-[45em] text-text-sub',
          isSplitVertical ? 'mb-6 md:col-start-3 md:row-start-1' : 'mb-6'
        ].join(' ')}>
          {subtitle}
        </div>
      )}
      {meta && (
        <div className={[
          'text-sm text-[#666]',
          isSplitVertical ? 'mb-6 md:col-start-3 md:row-start-2' : 'mb-6'
        ].join(' ')}>
          {meta}
        </div>
      )}
      {actions && (
        <nav className={[
          'flex gap-4',
          align === 'center' && 'justify-center',
          isSplitVertical && 'md:col-start-3 md:row-start-3',
          "[&_a]:font-medium [&_a]:text-[#111] [&_a]:no-underline [&_a]:relative [&_a]:pb-0.5",
          "[&_a:after]:content-[''] [&_a:after]:absolute [&_a:after]:bottom-0 [&_a:after]:left-0 [&_a:after]:w-full [&_a:after]:h-[1px] [&_a:after]:bg-[#111] [&_a:after]:origin-right [&_a:after]:transition-transform [&_a:after]:duration-400 [&_a:after]:ease-[cubic-bezier(0.22,1,0.36,1)] [&_a:after]:scale-x-0",
          "[&_a:hover:after]:origin-left [&_a:hover:after]:scale-x-100",
          "[&_a]:motion-reduce:transition-none [&_a:after]:motion-reduce:transition-none"
        ].filter(Boolean).join(' ')}>
          {actions}
        </nav>
      )}
      {variant === 'ruled' && <hr className="border-0 h-[1px] bg-[#e5e5e5] mt-8" aria-hidden="true" />}
      <a 
        className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity motion-reduce:transition-none before:content-['#'] before:absolute before:top-[0.2em] before:left-[-1.2em] before:text-base before:font-semibold before:text-[#666] before:opacity-30 before:transition-opacity group-hover:before:opacity-100 before:motion-reduce:transition-none" 
        href={`#${id}`} 
        aria-label="この見出しへのリンクをコピー" 
      />
    </header>
  );
};

export default SectionHeading;