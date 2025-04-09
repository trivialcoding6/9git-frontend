'use client';
import { Separator } from '@/components/ui/separator';

type Props = {
  title: React.ReactNode;
  isMore?: boolean;
  children?: React.ReactNode;
  onMoreClick?: () => void;
};

export default function Card({
  title,
  isMore = false,
  onMoreClick, // ✅ 받아오기
  children,
}: Props) {
  return (
    <section className="bg-primary-light rounded-xl p-4 w-[90%] flex flex-col gap-y-4">
      <div className="text-secondary flex justify-between items-center font-semibold">
        <span>{title}</span>
        {isMore && (
          <button
            onClick={onMoreClick} // ✅ 클릭 이벤트 연결!
            className="text-sm text-secondary font-semibold hover:text-primary"
          >
            + 더보기
          </button>
        )}
      </div>
      <Separator className="bg-beige-deco" />
      <div>{children}</div>
    </section>
  );
}
