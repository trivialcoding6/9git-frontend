'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams, usePathname, useSearchParams, useRouter } from 'next/navigation';
import { ChatbotUserInput } from './ChatbotUserInput';
import { Chat } from '@/types/chat';
import { addChat, addStorage, getChats } from '@/apis/chat';
import { useUserStore } from '@/stores/user';

type Props = {
  initialChats: Chat[];
};

// 스켈레톤 메시지 컴포넌트
const SkeletonMessage = () => (
  <div className="flex items-start gap-2 justify-start">
    <img src="/chatbot-avatar.webp" alt="gitnyang" className="w-5.5 h-5 rounded-full mt-1" />
    <div className="max-w-[75%] px-4 py-2 rounded-xl text-sm self-start bg-white text-secondary shadow">
      <div className="animate-pulse">
        <div className="h-3 bg-gray-200 rounded w-3/4 mb-1"></div>
        <div className="h-3 bg-gray-200 rounded w-12"></div>
      </div>
    </div>
  </div>
);

export const Chating = ({ initialChats }: Props) => {
  const [messages, setMessages] = useState<Chat[]>(initialChats);
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user } = useUserStore();
  const userId = user?.id || '';
  const categoryId = searchParams.get('categoryId') || (params.selectedId as string);

  // 스크롤 기능을 위한 ref 추가
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // URL에서 storageId 추출
  const pathStorageId = pathname.split('/').pop();

  // storageId 상태와 새 채팅 여부 설정
  const [storageId, setStorageId] = useState<string | null>(
    pathStorageId && pathStorageId !== 'new' ? pathStorageId : null
  );
  const [isNewChat, setIsNewChat] = useState(
    !pathStorageId || pathStorageId === 'new' || pathStorageId === ''
  );

  // 자동 스크롤 함수
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // messages가 변경될 때마다 스크롤
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // 채팅 내역 새로고침 함수
  const refreshChats = async (storageIdToUse: string) => {
    try {
      const chats = await getChats(userId, categoryId, storageIdToUse);

      // 채팅을 시간순으로 정렬 (오래된 순)
      const sortedChats = [...chats].sort((a, b) => {
        const dateA = new Date(a.createdAt || 0);
        const dateB = new Date(b.createdAt || 0);
        return dateA.getTime() - dateB.getTime();
      });

      setMessages(sortedChats);
      setIsLoading(false);
    } catch (error) {
      console.error('채팅 내역 로드 실패:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // 초기화: storageId가 있으면 기존 채팅 초기화
    if (!isNewChat && storageId) {
      const loadChats = async () => {
        try {
          const chats = await getChats(userId, categoryId, storageId);
          if (chats.length > 0) {
            // 채팅을 시간순으로 정렬
            const sortedChats = [...chats].sort((a, b) => {
              const dateA = new Date(a.createdAt || 0);
              const dateB = new Date(b.createdAt || 0);
              return dateA.getTime() - dateB.getTime();
            });

            setMessages(sortedChats);
          }
        } catch (error) {
          console.error('채팅 내역 로드 실패:', error);
        }
      };

      loadChats();
    }
  }, [isNewChat, storageId, categoryId, userId]);

  const handleSend = async (text: string) => {
    if (!text.trim()) return;

    // 로딩 상태 시작
    setIsLoading(true);

    try {
      // 1. 사용자 메시지 UI에 임시 추가
      const userMessage: Chat = { role: 'user', content: text };
      setMessages((prev) => [...prev, userMessage]);

      // 2. 로딩 상태 메시지 추가
      setMessages((prev) => [...prev, { role: 'assistant', content: '', isLoading: true }]);

      // 3. 새 채팅이면 스토리지 생성
      if (isNewChat) {
        try {
          // 스토리지 생성
          const storage = await addStorage({
            userId,
            categoryId,
            storage: {
              title: text.slice(0, 30), // 첫 메시지의 일부를 제목으로 사용
              createdAt: new Date().toISOString(),
            },
          });

          // 생성된 스토리지 ID 저장 및 상태 업데이트
          const newStorageId = storage.id;
          setStorageId(newStorageId);
          setIsNewChat(false); // 더 이상 새 채팅이 아님

          // 순서 보장을 위한 순차 처리
          const now = new Date();

          // 1. 먼저 초기 예시 메시지들 순차적으로 저장
          if (initialChats.length > 0) {
            // 순서대로 저장하기 위해 for...of 루프 사용
            for (let i = 0; i < initialChats.length; i++) {
              const chat = initialChats[i];
              const timestamp = new Date(now.getTime() - (initialChats.length - i) * 1000);

              await addChat({
                userId,
                categoryId,
                storageId: newStorageId,
                chat: {
                  role: chat.role,
                  content: chat.content,
                  createdAt: timestamp.toISOString(), // 예시 메시지는 더 이전 시간으로 설정
                },
              });

              // 각 요청 사이에 약간의 지연 추가 (네트워크 요청 순서 보장)
              await new Promise((resolve) => setTimeout(resolve, 100));
            }
          }

          // 2. 그 다음 사용자 메시지 저장 (최신 시간으로)
          await addChat({
            userId,
            categoryId,
            storageId: newStorageId,
            chat: {
              role: 'user',
              content: text,
              createdAt: now.toISOString(), // 사용자 메시지는 현재 시간으로 설정
            },
          });

          // URL 상태 업데이트 (페이지 새로고침 없이 URL만 변경)
          window.history.replaceState(
            {},
            '',
            `/chatbot/s/${newStorageId}?categoryId=${categoryId}`
          );

          // 일정 시간 후 채팅 내역 새로고침
          setTimeout(async () => {
            await refreshChats(newStorageId);
          }, 1000);
        } catch (error) {
          console.error('스토리지 생성 또는 메시지 저장 실패:', error);
          // 오류 메시지 표시
          setMessages((prev) => prev.filter((_, idx) => idx !== prev.length - 1));
          setMessages((prev) => [
            ...prev,
            { role: 'assistant', content: '스토리지 생성 중 오류가 발생했습니다.' },
          ]);
          setIsLoading(false);
        }
      } else {
        // 7. 기존 채팅이면 현재 스토리지에 메시지 추가
        if (storageId) {
          await addChat({
            userId,
            categoryId,
            storageId,
            chat: {
              role: 'user',
              content: text,
              createdAt: new Date().toISOString(),
            },
          });

          // 8. 일정 시간 후 채팅 내역 새로고침
          setTimeout(async () => {
            await refreshChats(storageId);
          }, 1000);
        }
      }
    } catch (error) {
      console.error('메시지 전송 실패:', error);
      // 오류 처리
      setMessages((prev) => prev.filter((_, idx) => idx !== prev.length - 1));
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: '죄송합니다, 메시지 처리 중 오류가 발생했습니다.' },
      ]);
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-between h-[calc(100%-160px)]">
      <div className="flex flex-col gap-3 px-4 py-4 overflow-y-auto">
        {messages.map((msg, idx) =>
          msg.content === '' ? (
            <SkeletonMessage key={`skeleton-${idx}`} />
          ) : (
            <div
              key={idx}
              className={`flex items-start gap-2 ${
                msg.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {msg.role === 'assistant' && (
                <img
                  src="/chatbot-avatar.webp"
                  alt="gitnyang"
                  className="w-5.5 h-5 rounded-full mt-1"
                />
              )}

              <div
                className={`max-w-[75%] px-4 py-2 rounded-xl text-sm ${
                  msg.role === 'user'
                    ? 'self-end bg-primary text-white'
                    : 'self-start bg-white text-secondary shadow'
                }`}
              >
                {msg.content}
              </div>
            </div>
          )
        )}
        {/* 스크롤 앵커 요소 추가 */}
        <div ref={messagesEndRef} />
      </div>

      <ChatbotUserInput onSend={handleSend} disabled={isLoading} />
    </div>
  );
};
