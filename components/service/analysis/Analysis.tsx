import { Logo } from '@/components/common/Logo';
import { Header } from '@/components/shared/Header';
import AnalysisPage from './AnalysisPage';

export const Analysis = () => {
  return (
    <div>
      <Header>
        <Logo width={45} height={45} />
      </Header>
      <AnalysisPage />
    </div>
  );
};
