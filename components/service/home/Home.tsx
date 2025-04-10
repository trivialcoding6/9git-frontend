'use client';
import { Logo } from '@/components/common/Logo';
import { Header } from '@/components/shared/Header';
import Todays from './Todays';
import { ProfileAvatar } from './ProfileAvatar';

export const Home = () => {
  return (
    <div>
      <Header>
        <Logo width={45} height={45} />
      </Header>
      <ProfileAvatar />
      <Todays />
    </div>
  );
};
