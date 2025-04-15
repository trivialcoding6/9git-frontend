import { Logo } from '@/components/common/Logo';
import { Header } from '@/components/shared/Header';
import { Calendar } from './Calendar/Calendar';
import { TodoAndMemoSection } from './TodoAndMemoSection';

export const Schedule = () => {
  return (
    <main className="flex flex-col gap-4 bg-beige-light">
      <Header>
        <Logo width={45} height={45} />
      </Header>
      <div className="p-4 flex-1">
        <Calendar />
        <TodoAndMemoSection />
      </div>
    </main>
  );
};
