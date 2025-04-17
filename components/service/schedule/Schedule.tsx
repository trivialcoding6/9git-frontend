import { Logo } from '@/components/common/Logo';
import { Header } from '@/components/shared/Header';
import { Calendar } from './Calendar/Calendar';
import { TodoAndMemoSection } from './TodoAndMemoSection';
import { getTodAndMemoList } from '@/apis/todo';
import { getUser } from '@/actions/user';
import { Suspense } from 'react';
import { fetchAllCategories } from '@/apis/category';
import { redirect } from 'next/navigation';
export const Schedule = async () => {
  const user = await getUser();
  const { todos, memos } = await getTodAndMemoList({
    userId: user.id,
    startDate: '2025-04-16',
    endDate: '2030-12-31',
  });

  if (!user) {
    redirect('/login');
  }

  const response = await fetchAllCategories();
  const categoryItems = response.data;

  return (
    <main className="flex flex-col gap-4 bg-beige-light">
      <Header>
        <Logo width={45} height={45} />
      </Header>

      <div className="p-4 flex-1">
        <Calendar categoryItems={categoryItems} todos={todos} memos={memos} />

        <Suspense fallback={null}>
          <TodoAndMemoSection todos={todos} memos={memos} />
        </Suspense>
      </div>
    </main>
  );
};
