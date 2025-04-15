'use client';
import { Separator } from '@/components/ui/separator';

type Props = {
  title: React.ReactNode;
  isMore?: boolean;
  onMoreClick?: () => void;
  children?: React.ReactNode;
  rightAction?: React.ReactNode;
  bgColor?: string;
  shadowColor?: string;
  className?: string;
};

export default function Card({
  title,
  isMore = false,
  onMoreClick,
  children,
  rightAction,
  bgColor = 'var(--beige-light)',
  shadowColor = 'rgba(250, 181, 127, 0.4)',
  className = '',
}: Props) {
  return (
    <section
      className={`rounded-xl p-4 w-[90%] flex flex-col gap-y-4 ${className}`}
      style={{
        backgroundColor: bgColor,
        boxShadow: `2px 2px 4px ${shadowColor}`,
      }}
    >
      <div className="flex flex-col gap-y-1">
        <div className="flex justify-between items-center text-secondary text-xl ">
          <span>{title}</span>

          {rightAction ? (
            rightAction
          ) : isMore ? (
            <button onClick={onMoreClick} className="text-lg text-secondary hover:text-primary">
              + 더보기
            </button>
          ) : null}
        </div>
        <Separator className="bg-beige-deco" />
      </div>
      <div className="gap-y-4">{children}</div>
    </section>
  );
}
