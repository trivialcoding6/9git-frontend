'use client';

import { useState } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts';
import { Info } from 'lucide-react';
import Card from '@/components/common/Card';
import { chartData, insights, aiChallenges } from '@/mocks/analysisData';

const COLORS = ['#FDA63A', '#556B2F', '#6C88C4'];

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
    <div className="min-h-screen bg-[#FEF4E6] font-sans text-[#5C3A1E] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-[800px] flex flex-col gap-12 items-center">
        <h2 className="text-xl font-bold text-[#5C3A1E] w-full text-left pl-4">AI 종합평가</h2>
        {/* 📑 전체 달성도 */}
        <Card title="전체 달성도">
          <div className="flex flex-col items-center justify-center">
            <div className="relative w-[150px] h-[150px]">
              <PieChart width={150} height={150}>
                <Pie
                  data={[
                    { name: '전체 달성도', value: 85 },
                    { name: '남은 부분', value: 15 },
                  ]}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={60}
                  startAngle={90}
                  endAngle={450}
                  paddingAngle={3}
                  dataKey="value"
                >
                  <Cell fill="#FDA63A" />
                  <Cell fill="#EEE0CE" />
                </Pie>
              </PieChart>
              <div className="absolute inset-0 flex items-center justify-center text-xl font-bold">
                85%
              </div>
            </div>
            <div>
              <p className="text-sm text-center whitespace-pre-line mt-4">
                모든 카테고리를 종합했을 때 {'\n'}총 달성률은 85%예요! 잘하고 있어요! 💪
              </p>
            </div>
          </div>
        </Card>

        {/* 🏆 강점 & 개선점 */}
        <div className="flex gap-x-3 w-full px-4">
          {insights.map((item, idx) => (
            <Card key={idx} title={item.title} bgColor="#FDE8CE" shadowColor="#F6D1A5">
              <div className="flex flex-col items-center text-center gap-2 w-full">
                <div className="text-5xl">{item.emoji}</div>
                <p className="text-sm whitespace-pre-line leading-relaxed">{item.text}</p>
              </div>
            </Card>
          ))}
        </div>

        {/* 📈 목표별 달성현황 */}
        <Card title="목표별 달성현황">
          <div className="h-64 flex flex-col items-center justify-center">
            <div className="w-full max-w-[300px] h-full mx-auto">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 20, bottom: 0, left: 0 }}>
                  <defs>
                    {['영어', '운동', '코딩'].map((category, index) => (
                      <linearGradient
                        id={`color${category}`}
                        key={category}
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop offset="5%" stopColor={COLORS[index]} stopOpacity={0.6} />
                        <stop offset="95%" stopColor={COLORS[index]} stopOpacity={0} />
                      </linearGradient>
                    ))}
                  </defs>

                  <XAxis
                    dataKey="month"
                    interval={0}
                    tick={{ fontSize: 13, fill: '#5C3A1E' }}
                    axisLine={{ stroke: '#FDA63A' }}
                    tickLine={false}
                  />

                  <YAxis
                    domain={[0, 100]}
                    tickFormatter={() => ''}
                    tickLine={false}
                    axisLine={{ stroke: '#FDA63A' }}
                    width={30}
                  />

                  <Tooltip />

                  {selectedCategories.includes('영어') && (
                    <Area
                      type="monotone"
                      dataKey="영어"
                      stroke={COLORS[0]}
                      fillOpacity={1}
                      fill="url(#color영어)"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                      connectNulls={true}
                    />
                  )}

                  {selectedCategories.includes('운동') && (
                    <Area
                      type="monotone"
                      dataKey="운동"
                      stroke={COLORS[1]}
                      fillOpacity={1}
                      fill="url(#color운동)"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                      connectNulls={true}
                    />
                  )}

                  {selectedCategories.includes('코딩') && (
                    <Area
                      type="monotone"
                      dataKey="코딩"
                      stroke={COLORS[2]}
                      fillOpacity={1}
                      fill="url(#color코딩)"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                      connectNulls={true}
                    />
                  )}
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="flex justify-center gap-3 mt-4">
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
                    className={`px-4 py-1 rounded-full border text-sm transition-all ${
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
          </div>
        </Card>

        {/* 🤖 AI 추천 도전과제 */}
        <Card
          title={
            <div className="w-full flex justify-between items-center">
              AI 추천 도전과제
              <Info className="w-6 h-6 text-white fill-primary cursor-pointer" />
            </div>
          }
        >
          <div className="flex flex-col gap-4">
            {aiChallenges.map((item, idx) => (
              <div
                key={idx}
                className="bg-[#FEF4E6] rounded-xl p-4 border border-[#F68047] shadow-sm"
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-sm font-bold text-[#FDA63A]">• {item.title}</h3>
                  <span className="text-xs bg-[#FFF0DC] text-primary px-2 py-0.5 rounded-full">
                    추천
                  </span>
                </div>

                <ul className="text-sm whitespace-pre-line list-none text-[#5C3A1E] mb-2 space-y-1">
                  <li className="flex gap-1 items-start">
                    <span className="text-[#FDA63A] mt-0.5">💡</span>
                    <span>{item.desc[0]}</span>
                  </li>
                  <li className="flex gap-1 items-start">
                    <span className="text-[#FDA63A] mt-0.5">👍</span>
                    <span>{item.desc[1]}</span>
                  </li>
                </ul>

                <div className="flex items-center justify-start text-xs text-[#A66F2F] mt-1 gap-4">
                  <span className="flex items-center gap-1">📅 {item.period}</span>
                  <span className="flex items-center gap-1">⭐ {item.level}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
