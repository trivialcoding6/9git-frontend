import { Logo } from '@/components/common/Logo';
import { Header } from '@/components/shared/Header';
import Card from '@/components/common/Card';
import { ProgressBar } from '@/components/common/progressbar';

export const Home = () => {
  return (
    <div>
      <Header>
        <Logo width={45} height={45} />
      </Header>

      <div className="mt-6 flex flex-col items-center gap-4">
        <Card title="목표 진행률" isMore height="h-40">
          <div className="mt-4">
            <ProgressBar
              value={75}
              className="bg-[#F4DFC2] mt-2" // 전체 바 배경
              indicatorClassName="bg-[#FBAA24]" // 진행된 부분 색상
            />
          </div>
        </Card>
      </div>
    </div>
  );
};
