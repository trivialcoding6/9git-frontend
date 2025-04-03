import { Logo } from "@/components/common/Logo";
import { Header } from "@/components/shared/Header";
import Card from "@/components/common/Card"

export const Home = () => {
  return (
    <>
      <Header>
        <Logo width={45} height={45} />
      </Header>

       <div className="mt-6 flex flex-col items-center gap-4">
        <Card title="목표 진행률" isMore height="h-40" />
      </div>
    </>
  );
};
