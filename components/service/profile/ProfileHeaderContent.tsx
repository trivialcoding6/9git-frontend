'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useModalStore } from '@/stores/modal';
import ProfileModal from '@/components/service/profile/ProfileModal/ProfileModal';
import { logout } from '@/actions/logout';
export const ProfileHeaderContent = () => {
  const { openModal } = useModalStore();

  const clickProfile = () => {
    openModal({
      title: '나의 정보',
      component: <ProfileModal />,
    });
  };

  const handleLogout = async () => {
    await logout();
  };

  return (
    <nav className="flex items-center justify-between m-[6px]">
      <div className="flex items-center gap-2">
        <Avatar>
          <AvatarImage src="" alt="profile" className="bg-white" />
          <AvatarFallback className="bg-white">U</AvatarFallback>
        </Avatar>
        <p className="text-sm font-medium">홍길동</p>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          className="border-none shadow-none cursor-pointer"
          onClick={clickProfile}
        >
          나의 정보
        </Button>
        <Button
          variant="outline"
          className="border-none shadow-none cursor-pointer"
          onClick={handleLogout}
        >
          로그아웃
        </Button>
      </div>
    </nav>
  );
};
