'use client';

import { useEffect, useState, useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, DotProps } from 'recharts';
import { Info } from 'lucide-react';
import dynamic from 'next/dynamic';

import Card from '@/components/common/Card';
import { ActionButton } from '@/components/common/ActionButton';
import { useModalStore } from '@/stores/modal';
import {
  rawDailyData,
  insights,
  aiChallenges,
  chartData as mockChartData,
  initialStateTexts as mockInitialStateTexts,
} from '@/mocks/analysisData';
import { groupByMonthAndAverage, getCategoryExtremes } from '@/utils/chartUtils';
import { AnalysisPopup } from './AnalysisPopup';

const PieChartBox = dynamic(() => import('@/components/common/PieChartBox'), {
  ssr: false,
});

const COLORS: Record<CategoryType, string> = {
  영어: 'var(--primary)',
  운동: 'var(--category-exercise)',
  코딩: 'var(--category-coding)',
} as const;
type CategoryType = '영어' | '운동' | '코딩';

type TabType = 'daily' | 'monthly';

// 초기 상태 텍스트 타입 정의
type InitialStateTexts = {
  totalAchievement: string;
  strength: {
    title: string;
    emoji: string;
    text: string;
  };
  improvement: {
    title: string;
    emoji: string;
    text: string;
  };
  chart: string;
  aiChallenges: string;
};

export default function AnalysisPage() {
  const [selectedCategories, setSelectedCategories] = useState<CategoryType[]>([
    '영어',
    '운동',
    '코딩',
  ]);
  const [chartData, setChartData] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<TabType>('monthly');
  const [totalAchievementRate, setTotalAchievementRate] = useState<number>(0);
  const [hasData, setHasData] = useState<boolean>(false);
  const { openModal } = useModalStore();

  // 초기 상태 텍스트 상태 추가
  const [initialStateTexts, setInitialStateTexts] =
    useState<InitialStateTexts>(mockInitialStateTexts);

  // BE 데이터 fetch
  useEffect(() => {
    // TODO: BE API 호출
    const fetchData = async () => {
      try {
        // 실제 API 호출 시 아래 주석 해제
        // const response = await fetch('/api/analysis');
        // const data = await response.json();
        // setTotalAchievementRate(data.totalAchievementRate);
        // setChartData(data.chartData);
        // setHasData(true);

        // 초기 상태 텍스트도 함께 가져오기
        // setInitialStateTexts(data.initialStateTexts);

        // 임시로 mock 데이터 사용
        const monthlyData = groupByMonthAndAverage(rawDailyData);
        setChartData(monthlyData);

        // 초기 상태를 보여주기 위해 hasData를 false로 설정
        setHasData(false);
      } catch (error) {
        console.error('Failed to fetch analysis data:', error);
        setHasData(false);
      }
    };
    fetchData();
  }, []);

  const isExtremePoint = (category: CategoryType, value: number | undefined) => {
    if (value === undefined) return false;
    const currentData = activeTab === 'daily' ? filteredDailyData : filteredMonthlyData;
    const extremes = getCategoryExtremes(currentData, category);
    return value === extremes.min || value === extremes.max;
  };

  const getCategoryColor = (category: CategoryType) => {
    return COLORS[category];
  };

  const renderDot = (category: CategoryType) => (props: any) => {
    const { cx, cy, payload, index } = props;
    const value = payload[category];
    if (!isExtremePoint(category, value)) {
      return <circle key={`${category}-${index}-empty`} cx={cx} cy={cy} r={0} />;
    }
    return (
      <g key={`${category}-${index}`}>
        <circle cx={cx} cy={cy} r={4} fill={COLORS[category]} stroke="white" strokeWidth={1} />
        <text x={cx} y={cy - 10} textAnchor="middle" fill={COLORS[category]} fontSize="12">
          {value}%
        </text>
      </g>
    );
  };

  const getAllExtremes = (): number[] => {
    const values: number[] = [];
    selectedCategories.forEach((category) => {
      const extremes = getCategoryExtremes(rawDailyData, category);
      values.push(extremes.min, extremes.max);
    });
    return Array.from(new Set(values));
  };

  // 1월부터 6월까지의 데이터만 필터링
  const filteredDailyData = rawDailyData.filter((item) => {
    const date = new Date(item.date);
    const month = date.getMonth() + 1;
    return month >= 1 && month <= 6;
  });

  // 월별 데이터 필터링
  const filteredMonthlyData = chartData.filter((item) => {
    const month = parseInt(item.month);
    return month >= 1 && month <= 6;
  });

  // 월별로 데이터 그룹화하여 월 표시를 위한 데이터 준비
  const monthlyLabels = useMemo(() => {
    const labels: { date: string; month: number }[] = [];
    const months = new Set<number>();

    filteredDailyData.forEach((item) => {
      const date = new Date(item.date);
      const month = date.getMonth() + 1;
      if (!months.has(month)) {
        months.add(month);
        labels.push({ date: item.date, month });
      }
    });

    return labels.sort((a, b) => a.month - b.month);
  }, [filteredDailyData]);

  // 월 표시를 위한 커스텀 틱 컴포넌트
  const CustomTick = (props: any) => {
    const { x, y, payload } = props;
    const date = new Date(payload.value);
    const isFirstDayOfMonth = date.getDate() === 1;

    if (!isFirstDayOfMonth) {
      return null;
    }

    return (
      <g transform={`translate(${x},${y})`}>
        <text x={0} y={0} dy={16} textAnchor="middle" fill="var(--main-gray)" fontSize={13}>
          {date.getMonth() + 1}월
        </text>
      </g>
    );
  };

  // 월 표시를 위한 커스텀 X축 컴포넌트
  const CustomXAxis = (props: any) => {
    const { x, y, width, height, stroke, tickFormatter } = props;

    // 월별 레이블 생성
    const monthTicks = monthlyLabels.map((label, index) => {
      // 해당 월의 첫 날 데이터 찾기
      const firstDayData = filteredDailyData.find((item) => {
        const date = new Date(item.date);
        return date.getMonth() + 1 === label.month && date.getDate() === 1;
      });

      if (!firstDayData) return null;

      // 해당 데이터의 X 좌표 계산 (대략적인 위치)
      const dataIndex = filteredDailyData.findIndex((item) => item.date === firstDayData.date);
      const position = (dataIndex / (filteredDailyData.length - 1)) * width;

      return (
        <g key={`month-${label.month}`} transform={`translate(${position},${y + height})`}>
          <text x={0} y={0} dy={16} textAnchor="middle" fill="var(--main-gray)" fontSize={13}>
            {label.month}월
          </text>
        </g>
      );
    });

    return (
      <g>
        <line x1={x} y1={y + height} x2={x + width} y2={y + height} stroke={stroke} />
        {monthTicks}
      </g>
    );
  };

  return (
    <div className="min-h-screen bg-[var(--beige-light)] text-[var(--main-gray)] flex justify-center px-4 py-10">
      <div className="w-full max-w-[800px] flex flex-col gap-12 items-center">
        <h2 className="text-2xl text-secondary w-full text-left pl-4">AI 종합평가</h2>

        <Card title={<div className="text-secondary">전체 달성도</div>} bgColor="var(--beige-base)">
          <div className="flex flex-col items-center justify-center">
            <PieChartBox value={totalAchievementRate} />

            {/* 초기 상태 텍스트 박스 */}
            {!hasData && (
              <div className="w-full flex justify-center mt-4">
                <div className="bg-[var(--beige-light)] rounded-xl p-4  w-[95%] min-h-[80px] flex items-center justify-center mx-auto">
                  <p className="text-base whitespace-pre-line text-secondary text-center">
                    {initialStateTexts.totalAchievement}
                  </p>
                </div>
              </div>
            )}

            {hasData && (
              <div className="bg-[var(--beige-base)] rounded-xl px-6 py-3 mt-4">
                <p className="text-lg text-center whitespace-pre-line text-secondary">
                  {initialStateTexts.totalAchievement}
                </p>
              </div>
            )}
          </div>
        </Card>

        <div className="flex gap-x-2 w-full px-2 justify-center">
          {(hasData
            ? insights
            : [
                {
                  title: initialStateTexts.strength.title,
                  emoji: initialStateTexts.strength.emoji,
                  text: initialStateTexts.strength.text,
                },
                {
                  title: initialStateTexts.improvement.title,
                  emoji: initialStateTexts.improvement.emoji,
                  text: initialStateTexts.improvement.text,
                },
              ]
          ).map((item, idx) => (
            <div key={idx} className="flex-1 flex justify-center">
              <Card
                title={<div className="text-secondary">{item.title}</div>}
                bgColor="var(--beige-base)"
                className="w-[95%]"
              >
                <div className="flex flex-col items-center text-center gap-4 w-full py-4">
                  <div className="text-5xl">{item.emoji}</div>
                  <p className="text-base whitespace-pre-line leading-relaxed text-secondary">
                    {item.text}
                  </p>
                </div>
              </Card>
            </div>
          ))}
        </div>

        <Card
          title={<div className="text-secondary">목표별 달성현황</div>}
          bgColor="var(--beige-base)"
        >
          <div className="flex flex-col items-center justify-center w-full">
            {/* 초기 상태 텍스트 박스 */}
            {!hasData && (
              <div className="w-full flex justify-center mb-4">
                <div className="bg-[var(--beige-light)] rounded-xl p-4 w-[95%] min-h-[80px] flex items-center justify-center mx-auto">
                  <p className="text-base whitespace-pre-line text-secondary text-center">
                    {initialStateTexts.chart}
                  </p>
                </div>
              </div>
            )}

            {/* 탭 버튼 */}
            <div className="flex justify-center w-full mb-4">
              <div className="inline-flex rounded-full border border-[var(--beige-deco)] bg-[var(--beige-base)] p-0.5">
                <button
                  className={`px-4 py-0 text-base rounded-full transition-all duration-150 ${
                    activeTab === 'monthly'
                      ? 'bg-[var(--primary)] text-white shadow-sm'
                      : 'text-secondary'
                  }`}
                  onClick={() => setActiveTab('monthly')}
                >
                  월평균
                </button>
                <button
                  className={`px-4 py-0 text-base rounded-full transition-all duration-150 ${
                    activeTab === 'daily'
                      ? 'bg-[var(--primary)] text-white shadow-sm'
                      : 'text-secondary'
                  }`}
                  onClick={() => setActiveTab('daily')}
                >
                  일자별
                </button>
              </div>
            </div>

            <div className="h-64 w-full max-w-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={activeTab === 'daily' ? filteredDailyData : filteredMonthlyData}
                  margin={{ top: 10, right: 20, bottom: 0, left: 0 }}
                >
                  <defs>
                    {(['영어', '운동', '코딩'] as CategoryType[]).map((category) => (
                      <linearGradient
                        key={category}
                        id={`color${category}`}
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop offset="5%" stopColor={COLORS[category]} stopOpacity={0.6} />
                        <stop offset="95%" stopColor={COLORS[category]} stopOpacity={0} />
                      </linearGradient>
                    ))}
                  </defs>

                  <XAxis
                    dataKey={activeTab === 'daily' ? 'date' : 'month'}
                    interval={0}
                    axisLine={{ stroke: 'var(--primary)' }}
                    tickLine={false}
                    tick={
                      activeTab === 'daily'
                        ? { fontSize: 13, fill: 'var(--main-gray)' }
                        : { fontSize: 13, fill: 'var(--main-gray)' }
                    }
                    tickFormatter={activeTab === 'monthly' ? (value) => `${value}` : (value) => ''}
                    minTickGap={activeTab === 'daily' ? 5 : 0}
                  />

                  {activeTab === 'daily' && (
                    <CustomXAxis x={0} y={0} width={300} height={200} stroke="var(--primary)" />
                  )}

                  <YAxis
                    domain={[0, 100]}
                    tickFormatter={() => ''}
                    tickLine={false}
                    axisLine={{ stroke: 'var(--primary)' }}
                    width={30}
                  />

                  <Tooltip
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        if (activeTab === 'daily') {
                          const date = new Date(label);
                          return (
                            <div className="bg-white p-2 rounded-lg shadow-md border border-gray-200">
                              <p className="text-sm font-medium text-[var(--main-gray)]">
                                {date.getFullYear()}년 {date.getMonth() + 1}월 {date.getDate()}일
                              </p>
                              {payload.map((entry: any, index: number) => (
                                <p
                                  key={index}
                                  className="text-sm"
                                  style={{ color: COLORS[entry.dataKey as CategoryType] }}
                                >
                                  {entry.dataKey}: {entry.value}%
                                </p>
                              ))}
                            </div>
                          );
                        } else {
                          return (
                            <div className="bg-white p-2 rounded-lg shadow-md border border-gray-200">
                              <p className="text-sm font-medium text-[var(--main-gray)]">{label}</p>
                              {payload.map((entry: any, index: number) => (
                                <p
                                  key={index}
                                  className="text-sm"
                                  style={{ color: COLORS[entry.dataKey as CategoryType] }}
                                >
                                  {entry.dataKey}: {entry.value}%
                                </p>
                              ))}
                            </div>
                          );
                        }
                      }
                      return null;
                    }}
                    cursor={{ stroke: 'var(--primary)', strokeWidth: 1, strokeDasharray: '3 3' }}
                  />

                  {selectedCategories.map((category) => (
                    <Area
                      key={category}
                      type="monotone"
                      dataKey={category}
                      stroke={COLORS[category]}
                      fill={`url(#color${category})`}
                      strokeWidth={2}
                      dot={renderDot(category)}
                      activeDot={false}
                      connectNulls
                    />
                  ))}
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="flex justify-center gap-2.5 mt-4 w-full">
              {(['영어', '운동', '코딩'] as CategoryType[]).map((category) => {
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
                    className={`px-3.5 py-0 rounded-full border text-base transition-all ${
                      isSelected
                        ? 'text-white border-transparent'
                        : 'text-secondary border-primary border-2 bg-white'
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

        <Card
          title={
            <div className="-mx-4 px-4 flex justify-between items-center">
              <div className="text-secondary text-xl">AI 추천 도전과제</div>
              <div
                className="cursor-pointer"
                onClick={() =>
                  openModal({
                    title: '안내',
                    component: <AnalysisPopup />,
                  })
                }
              >
                <Info className="w-4 h-4 text-white fill-[var(--primary)]" />
              </div>
            </div>
          }
          bgColor="var(--beige-base)"
        >
          <div className="flex flex-col gap-4">
            {hasData ? (
              aiChallenges.map((item, idx) => (
                <div key={idx} className="bg-[var(--beige-light)] rounded-xl p-4 w-[95%] mx-auto">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-base text-[var(--primary)]">• {item.title}</h3>
                    <span className="text-base bg-[var(--primary-light)] text-[var(--primary)] px-2 py-0.5 rounded-full">
                      추천
                    </span>
                  </div>

                  <ul
                    className="text-sm whitespace-pre-line list-none text-secondary 
                  mb-2 space-y-1"
                  >
                    <li className="flex gap-1 items-start">
                      <span className="text-[var(--primary)] mt-0.5">💡</span>
                      <span>{item.desc[0]}</span>
                    </li>
                    <li className="flex gap-1 items-start">
                      <span className="text-[var(--primary)] mt-0.5">👍</span>
                      <span>{item.desc[1]}</span>
                    </li>
                  </ul>

                  <div className="flex items-center justify-start text-xs text-[var(--secondary)] mt-1 gap-4">
                    <span className="flex items-center gap-1">📅 {item.period}</span>
                    <span className="flex items-center gap-1">⭐ {item.level}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-[var(--beige-light)] rounded-xl p-4 min-h-[80px] flex items-center justify-center w-[95%] mx-auto">
                <p className="text-base whitespace-pre-line text-secondary text-center">
                  {initialStateTexts.aiChallenges}
                </p>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
