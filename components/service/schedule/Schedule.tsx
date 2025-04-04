import { Calendar } from '@/components/service/schedule/Calendar/Calendar';
import { CalendarDay } from '@/components/service/schedule/Calendar/CalendarDay';
import { CalendarMonth } from '@/components/service/schedule/Calendar/CalendarMonth';
import { Logo } from '@/components/common/Logo';
import { Header } from '@/components/shared/Header';

export const Schedule = () => {
  return (
    <main className="flex flex-col gap-4 bg-[#FEF4E6] h-full">
      <Header>
        <Logo width={45} height={45} />
      </Header>
      <div className="p-4">
        <Calendar>
          <CalendarMonth />
          <CalendarDay />
        </Calendar>
      </div>
    </main>
  );
};
