import Card from '@/components/common/Card';
import { ProgressBar } from './ProgressBar';
import TodoItem from '@/components/shared/TodoItem';

export default function HomeContainer() {
  return (
    <div className="bg-white min-h-screen flex flex-col">
      {/* 프로필 + 경험치바 전체 영역 */}
      <div className="py-6 px-3 space-y-4">
        <div className="max-w-md mx-auto flex items-center gap-4">
          <div className="w-20 h-20 rounded-full border-2 border-[#FBAA24] overflow-hidden shrink-0 flex items-center justify-center">
            <img
              src="/path-to-cat-avatar.png"
              alt="프로필"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 max-w-[calc(100%-5rem)] border-[2px] border-[#FBAA24] rounded-full px-4 py-3 flex flex-col justify-center">
            <div className="flex items-center gap-1">
              <span className="font-bold text-[#5B3E1D] text-sm">코딩냥</span>
              <span className="text-sm">🐾</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
              <div
                className="bg-[#FBAA24] h-2 rounded-full transition-all duration-300"
                style={{ width: '75%' }}
              ></div>
            </div>
            <p className="text-[10px] text-gray-500 mt-1">경험치 75%</p>
          </div>
        </div>
      </div>

      {/* 카드 리스트 + 하단 영역 (flex-1로 아래까지 확장) */}
      <div className="bg-[#FDE8CE] flex-1 rounded-t-4xl shadow pt-6 pb-6 px-4 space-y-6 overflow-y-auto flex flex-col items-center w-full max-w-md mx-auto scrollbar-hide">
        <Card title="오늘의 목표 진행률" isMore>
          <ProgressBar value={75} title="응원 문구" />
        </Card>
        <Card title="목표별 현황">
          <div className="flex flex-col space-y-4">
            <ProgressBar value={75} title="영어" />
            <ProgressBar value={50} title="코딩" />
            <ProgressBar value={65} title="운동" />
          </div>
        </Card>
        <Card title="오늘의 To Do">
          <TodoItem category="영어" text="영어 단어 20개 외우기" />
          <TodoItem category="코딩" text="파이썬 공부 교재 보기" />
          <TodoItem category="운동" text="저녁 조깅" />
        </Card>

        <Card title="오늘의 메모" />
      </div>
    </div>
  );
}
