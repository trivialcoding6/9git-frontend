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

import Card from '@/components/common/Card';
import {
  totalProgressData, // 전체 달성도 원형 차트 데이터
  totalProgressComment, // 전체 달성도 텍스트 코멘트
  goalData, // 목표별 달성 현황 (라인 차트)
  analysisComments, // 강점/개선점 분석
  recommendedChallenges, // AI 추천 도전과제
} from '@/mocks/analysisData';

const COLORS = ['#FDA63A', '#556B2F', '#6C88C4']; // 영어, 운동, 코딩

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
        <Card title="📑 전체 달성도">
          <div className="flex flex-col items-center justify-center h-full">
            <div className="relative w-[150px] h-[150px]">
              <PieChart width={150} height={150}>
                <Pie
                  data={totalProgressData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={60}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {totalProgressData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
              <div className="absolute inset-0 flex items-center justify-center text-xl font-bold">
                {totalProgressData?.[0]?.value ?? 0}%
              </div>
            </div>
            <div className="bg-[#FEF4E6] mt-4 rounded-lg w-full h-[110px] flex items-center justify-center">
              <p className="text-sm text-center whitespace-pre-line">{totalProgressComment}</p>
            </div>
          </div>
        </Card>

        {/* 강점 / 개선점 */}
        <div className="grid grid-cols-2 gap-[6px] w-full justify-center">
          {analysisComments.map((item) => (
            <Card key={item.id} title={item.title}>
              <div className="text-center mb-2 text-5xl">
                {item.type === 'strength' ? '🏆' : '🤔'}
              </div>
              <p className="text-sm text-center whitespace-pre-line">{item.description}</p>
            </Card>
          ))}
        </div>

        {/* 목표별 달성현황 */}
        <Card title="목표별 달성현황">
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
                      ? 'text-white border-[transparent]'
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
              <LineChart data={goalData} margin={{ top: 10, right: 20, bottom: 0, left: -10 }}>
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
        </Card>

        {/* AI 추천 도전과제 */}
        <Card title="AI 추천 도전과제">
          {recommendedChallenges.map((challenge, index) => (
            <div key={index} className="bg-[#FFF6EC] border border-[#F68047] rounded-xl p-4 mb-4">
              <div className="flex justify-between items-center mb-1">
                <h3 className="text-sm font-bold text-[#F68047]">• {challenge.title}</h3>
                <span className="text-xs bg-[#F68047] text-white px-2 py-0.5 rounded-full">
                  추천
                </span>
              </div>
              <ul className="text-sm list-disc pl-4 text-[#5C3A1E]">
                {challenge.description.map((line, i) => (
                  <li key={`line-${i}`}>{line}</li>
                ))}
              </ul>
              <div className="text-xs text-right mt-2 text-[#A66F2F]">
                📅 {challenge.period}&nbsp;&nbsp;&nbsp;
                <span className="font-semibold">{challenge.level}</span>
              </div>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}
