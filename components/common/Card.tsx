'use client';
import { Separator } from '@/components/ui/separator';

type Props = {
  title: React.ReactNode;
  isMore?: boolean;
  children?: React.ReactNode;
  onMoreClick?: () => void;
  bgColor?: string;
  shadowColor?: string;
  className?: string;
};

export default function Card({
  title,
  isMore = false,
  children,
  bgColor = 'var(--beige-light)',
  shadowColor = 'var(--beige-deco)',
  className = '',
}: Props) {
  return (
    <section
      className={`rounded-xl p-4 w-[90%] flex flex-col gap-y-4 ${className}`}
      style={{
        backgroundColor: bgColor,
        boxShadow: `2px 2px 0 ${shadowColor}`,
      }}
    >
      <div className="flex flex-col gap-y-1">
        <div className="flex justify-between items-center font-semibold">
          {title}
          {isMore && (
            <div className="text-sm text-secondary font-semibold hover:text-primary cursor-pointer">
              + 더보기
            </div>
          )}
        </div>
        <Separator className="bg-[var(--beige-deco)]" />
      </div>
      <div className="h-full">{children}</div>
    </section>
  );
}
