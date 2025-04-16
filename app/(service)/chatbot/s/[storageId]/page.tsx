import { getUser } from '@/actions/user';
import { ChatbotIntro } from '@/components/service/chatbot/ChatbotIntro';
import { Chating } from '@/components/service/chatbot/Chating';
import { Chat } from '@/types/chat';
import { getChats } from '@/apis/chat';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import ChatbotLoading from './loading';

// 채팅 컨텐츠 컴포넌트 - 정렬된 데이터만 반환
async function ChatContent({
  user,
  storageId,
  categoryId,
}: {
  user: any;
  storageId: string;
  categoryId: string;
}) {
  try {
    // 채팅 내역 가져오기
    const initialChats = await getChats(user.id, categoryId, storageId);

    // 채팅 내역 시간순 정렬 (오래된 순으로 정렬하여 시간 흐름대로 표시)
    const sortedChats = [...initialChats].sort((a, b) => {
      const dateA = new Date(a.createdAt || 0);
      const dateB = new Date(b.createdAt || 0);
      return dateA.getTime() - dateB.getTime(); // 오래된 순 정렬
    });

    // 채팅 내역이 없는 경우 기본 메시지 표시
    if (sortedChats.length === 0) {
      sortedChats.push({
        role: 'assistant',
        content: '안녕하세요! 도움이 필요하신가요?',
      });
    }

    return <Chating initialChats={sortedChats} />;
  } catch (error) {
    console.error('채팅 내역 로드 중 오류 발생:', error);

    // 오류 발생 시 기본 메시지 표시
    const fallbackChats = [
      {
        role: 'assistant',
        content:
          '채팅 내역을 불러오는 중 문제가 발생했습니다. 새로고침 해보시거나 잠시 후 다시 시도해주세요.',
      },
    ];

    return <Chating initialChats={fallbackChats} />;
  }
}

// 메인 페이지 컴포넌트
export default async function ChatbotPage({
  params,
  searchParams,
}: {
  params: Promise<{ storageId: string }>;
  searchParams: Promise<{ categoryId?: string }>;
}) {
  const { storageId } = await params;
  const { categoryId } = await searchParams;

  // 사용자 정보 가져오기
  const user = await getUser();

  if (!user) {
    // 사용자 정보가 없으면 로그인 페이지로 리다이렉트
    redirect(
      '/auth/login?redirect=' +
        encodeURIComponent(`/chatbot/s/${storageId}?categoryId=${categoryId}`)
    );
  }

  // 카테고리 ID가 없으면 에러 메시지 표시
  if (!categoryId) {
    return (
      <>
        <ChatbotIntro showSelectBox={false} />
        <div className="flex flex-col justify-center items-center h-[calc(100%-160px)]">
          <div className="text-center text-secondary">
            <h2 className="text-xl font-bold mb-2">카테고리 정보가 필요합니다</h2>
            <p>올바른 카테고리 ID와 함께 페이지에 접근해주세요.</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {/* Suspense를 사용하여 컨텐츠 로딩 중에는 loading.tsx의 스켈레톤이 표시됨 */}
      <Suspense fallback={<ChatbotLoading />}>
        <ChatbotIntro showSelectBox={false} />
        <ChatContent user={user} storageId={storageId} categoryId={categoryId} />
      </Suspense>
    </>
  );
}

// 이 함수는 동적 라우트의 정적 생성을 위한 함수입니다 (선택적)
export async function generateStaticParams() {
  // 대부분의 경우 동적 페이지이므로 빈 배열 반환
  return [];
}
