import { Logo } from "@/components/common/Logo";

export const AuthHeader = () => {
  return (
    <header className="flex flex-col items-center justify-center">
      <Logo width={193} height={193} />
      <p className="text-sm text-bold text-[#FDA63A]">
        필요한 순간만 접어놓다, 내 하루의 구깃
      </p>
    </header>
  );
};
