// 목표 진행률
import { Separator } from '@/components/ui/separator';

interface CardProps {
  title: string;
  height?: string;
  isMore?: boolean;
}

export default function Card({
  title,
  height, //높이 수정
  isMore = false,
}: CardProps) {
  return (
    <section className={`bg-[#fff0d5] rounded-xl p-4 space-y-2 w-[90%] ${height}`}>
      <div className="flex justify-between items-center font-semibold">
        <span>{title}</span>
        {isMore && (
          <div className="text-sm text-[#7F4E28] font-semibold hover:text-[#A35F30]">+ 더보기</div>
        )}
      </div>
      <Separator className="bg-[#f4ddbd]" />
    </section>
  );
}
