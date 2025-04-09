'use client';
import { Separator } from '@/components/ui/separator';

interface CardProps {
  title: React.ReactNode;
  height?: string;
  isMore?: boolean;
  children?: React.ReactNode; //chilren 생성
}

export default function Card({
  title,
  height, //높이 수정
  isMore = false,
  children,
}: CardProps) {
  return (
    <section className="bg-primary-light rounded-xl p-4 w-[90%] flex flex-col gap-y-4">
      <div className="flex justify-between items-center font-semibold">
        <span>{title}</span>
        {isMore && (
          <div className="text-sm text-secondary font-semibold hover:text-primary">+ 더보기</div>
        )}
      </div>
      <Separator className="bg-beige-deco" />

      <div>{children}</div>
    </section>
  );
}
