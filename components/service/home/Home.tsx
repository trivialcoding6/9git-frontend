'use client';
import { Logo } from '@/components/common/Logo';
import { Header } from '@/components/shared/Header';

import HomeContainer from './HomeContainer';

export const Home = () => {
  return (
    <div>
      <Header>
        <Logo width={45} height={45} />
      </Header>

      <HomeContainer />
    </div>
  );
};
