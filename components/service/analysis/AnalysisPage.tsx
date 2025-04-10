'use client';

import { useState } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const COLORS = ['#FDA63A', '#556B2F', '#6C88C4']; // 영어, 운동, 코딩

const totalProgress = [
  { name: '영어', value: 85 },
  { name: '운동', value: 65 },
  { name: '코딩', value: 40 },
];

const goalData = [
  { month: '1월', 영어: 20, 운동: 13, 코딩: 30 },
  { month: '2월', 영어: 60, 운동: 60, 코딩: 40 },
  { month: '3월', 영어: 75, 운동: 45, 코딩: 50 },
  { month: '4월', 영어: 85, 운동: 70, 코딩: 55 },
  { month: '5월', 영어: 80, 운동: 65, 코딩: 60 },
  { month: '6월', 영어: 90, 운동: 80, 코딩: 65 },
];

export default function AnalysisPage() {
  const [selectedCategories, setSelectedCategories] = useState(['영어', '운동', '코딩']);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case '영어':
        return COLORS[0];
      case '운동':
        return COLORS[1];
      case '코딩':
        return COLORS[2];
      default:
        return '#ccc';
    }
  };

  return (
    <div className="bg-[#FEF4E6] min-h-screen font-sans text-[#5C3A1E] px-4 pb-36 pt-10 flex justify-center">
      <div className="w-full max-w-[800px] flex flex-col gap-12">
        {/* 전체 달성도 */}
        <div className="bg-white rounded-2xl p-6 shadow-md">
          <h2 className="text-lg font-semibold mb-4">📑 전체 달성도</h2>
          <div className="flex flex-col items-center justify-center">
            <div className="relative w-[150px] h-[150px]">
              <PieChart width={150} height={150}>
                <Pie
                  data={totalProgress}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={60}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {totalProgress.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
              <div className="absolute inset-0 flex items-center justify-center text-xl font-bold">
                85%
              </div>
            </div>
            <p className="text-sm text-center whitespace-pre-line mt-4">
              꾸준한 노력으로 목표를 잘 달성하고 있어요!
              {'\n'}특히, 영어 학습에서 큰 진전이 있었습니다.
            </p>
          </div>
        </div>

        {/* 강점 / 개선점 */}
        <div className="grid grid-cols-2 gap-4">
          {[
            {
              type: 'strength',
              title: '강점',
              emoji: '🏆',
              text: '영어 카테고리에서 지금까지 80% 이상의 달성도를 보이고 있어요',
            },
            {
              type: 'weakness',
              title: '개선점',
              emoji: '🤔',
              text: '파이썬 프로젝트 todo 달성일은 30%밖에 되지 않아요.\n목표를 낮춰보는 건 어떨까요?',
            },
          ].map((item, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-4 shadow-md">
              <h3 className="text-base font-semibold mb-2">{item.title}</h3>
              <div className="text-center text-5xl mb-2">{item.emoji}</div>
              <p className="text-sm whitespace-pre-line text-center">{item.text}</p>
            </div>
          ))}
        </div>

        {/* 목표별 달성현황 */}
        <div className="bg-white rounded-2xl p-6 shadow-md">
          <h2 className="text-lg font-semibold mb-4">📈 목표별 달성현황</h2>
          <div className="flex justify-end mb-4">
            {['영어', '운동', '코딩'].map((category) => {
              const isSelected = selectedCategories.includes(category);
              const color = getCategoryColor(category);
              return (
                <button
                  key={category}
                  onClick={() =>
                    setSelectedCategories((prev) =>
                      isSelected ? prev.filter((c) => c !== category) : [...prev, category]
                    )
                  }
                  className={`px-3 py-1 ml-2 rounded-full border text-sm transition-all ${
                    isSelected
                      ? 'text-white border-transparent'
                      : 'text-[#5C3A1E] border-gray-300 bg-white'
                  }`}
                  style={
                    isSelected
                      ? {
                          backgroundColor: color,
                          borderColor: color,
                        }
                      : {}
                  }
                >
                  {category}
                </button>
              );
            })}
          </div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={goalData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                {selectedCategories.includes('영어') && (
                  <Line type="monotone" dataKey="영어" stroke={COLORS[0]} strokeWidth={3} />
                )}
                {selectedCategories.includes('운동') && (
                  <Line type="monotone" dataKey="운동" stroke={COLORS[1]} strokeWidth={3} />
                )}
                {selectedCategories.includes('코딩') && (
                  <Line type="monotone" dataKey="코딩" stroke={COLORS[2]} strokeWidth={3} />
                )}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI 추천 도전과제 */}
        <div className="bg-white rounded-2xl p-6 shadow-md">
          <h2 className="text-lg font-semibold mb-4">🤖 AI 추천 도전과제</h2>
          {[
            {
              title: '토익 850+ 달성',
              desc: [
                '14일 연속 하루에 10개씩 토익 단어를 외우고 있어요. 영어의 기본은 단어!',
                '다음엔 토익 850점에 도전해보는 건 어떨까요?',
                '(25년 4월 27일에 시험이 있어요)',
              ],
              level: '중급',
              period: '3개월',
            },
            {
              title: '파이썬 웹 크롤링 프로젝트',
              desc: [
                '3월 23일 메모 기록을 보니 데이터 분석 취직에 관심이 많아 보여요.',
                '포트폴리오용으로 공공데이터 활용 기획안을 작성해보는 건 어때요?',
              ],
              level: '초급',
              period: '2개월',
            },
          ].map((challenge, idx) => (
            <div key={idx} className="bg-[#FFF6EC] border border-[#F68047] rounded-xl p-4 mb-4">
              <div className="flex justify-between items-center mb-1">
                <h3 className="text-sm font-bold text-[#F68047]">• {challenge.title}</h3>
                <span className="text-xs bg-[#F68047] text-white px-2 py-0.5 rounded-full">
                  추천
                </span>
              </div>
              <ul className="text-sm list-disc pl-4 text-[#5C3A1E]">
                {challenge.desc.map((line, i) => (
                  <li key={i}>{line}</li>
                ))}
              </ul>
              <div className="text-xs text-right mt-2 text-[#A66F2F]">
                📅 {challenge.period}&nbsp;&nbsp;&nbsp;
                <span className="font-semibold">{challenge.level}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
