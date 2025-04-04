'use client';
import { Logo } from '@/components/common/Logo';
import { Header } from '@/components/shared/Header';
import Card from '@/components/common/Card';
import { ProgressBar } from '@/components/service/home/ProgressBar';
import CompleteButton from '@/components/common/CompleteButton';

export const Home = () => {
  return (
    <div>
      <Header>
        <Logo width={45} height={45} />
      </Header>

      <div className="mt-6 flex flex-col items-center gap-4">
        <Card title="목표 진행률" isMore>
          <ProgressBar value={75} title="영어" />
          <CompleteButton onClick={() => console.log('클릭됨!')} />
        </Card>
      </div>
    </div>
  );
};
