import { Logo } from '@/components/common/Logo';
import { AUTH_LOGO_WIDTH, AUTH_LOGO_HEIGHT } from '@/constants/logo';
export const AuthHeader = () => {
  return (
    <header className="flex flex-col items-center justify-center">
      <Logo width={AUTH_LOGO_WIDTH} height={AUTH_LOGO_HEIGHT} />
      <p className="text-sm text-bold text-primary">필요한 순간만 접어놓다, 내 하루의 구깃</p>
    </header>
  );
};
