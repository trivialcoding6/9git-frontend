import { ChatbotIntro } from '@/components/service/chatbot/ChatbotIntro';

// 페이지 상단 스켈레톤 컴포넌트
function HeaderSkeleton() {
  return (
    <div className="w-full bg-white border-b border-gray-200 animate-pulse">
      <div className="container mx-auto max-w-xl px-4 py-10 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
          <div className="h-4 bg-gray-300 rounded w-20"></div>
        </div>
        <div className="flex space-x-2">
          <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
          <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}

export default function ChatbotLoading() {
  return (
    <>
      {/* 페이지 상단 헤더 스켈레톤 */}
      <HeaderSkeleton />

      {/* 챗봇 인트로 스켈레톤 */}

      {/* 채팅 컨텐츠 스켈레톤 */}
      <div className="flex flex-col justify-between h-[calc(100%-160px)]">
        <div className="flex flex-col gap-3 px-4 py-4 overflow-y-scroll">
          {/* 어시스턴트 메시지 스켈레톤 (3개) */}
          <AssistantMessageSkeleton width="70%" />
          <UserMessageSkeleton width="50%" />
          <AssistantMessageSkeleton width="85%" />
          <UserMessageSkeleton width="40%" />
          <AssistantMessageSkeleton width="60%" />
        </div>

        {/* 입력창 스켈레톤 */}
        <div className="p-4 border-t">
          <div className="flex items-center">
            <div className="h-10 bg-gray-200 rounded-full animate-pulse w-full"></div>
            <div className="h-10 w-10 ml-2 bg-gray-300 rounded-full flex-shrink-0 animate-pulse"></div>
          </div>
        </div>
      </div>
    </>
  );
}

// 어시스턴트 메시지 스켈레톤 컴포넌트
function AssistantMessageSkeleton({ width }: { width: string }) {
  return (
    <div className="flex items-start gap-2 justify-start animate-pulse">
      <div className="w-6 h-6 rounded-full mt-1 bg-gray-300 flex-shrink-0"></div>
      <div className="max-w-[85%]" style={{ width }}>
        <div className="px-4 py-3 rounded-xl bg-white shadow">
          <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-[95%] mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-[90%] mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-[75%]"></div>
        </div>
      </div>
    </div>
  );
}

// 사용자 메시지 스켈레톤 컴포넌트
function UserMessageSkeleton({ width }: { width: string }) {
  return (
    <div className="flex items-start gap-2 justify-end animate-pulse">
      <div className="max-w-[85%]" style={{ width }}>
        <div className="px-4 py-3 rounded-xl bg-primary/30">
          <div className="h-3 bg-primary/20 rounded w-full mb-2"></div>
          <div className="h-3 bg-primary/20 rounded w-[90%]"></div>
        </div>
      </div>
    </div>
  );
}
