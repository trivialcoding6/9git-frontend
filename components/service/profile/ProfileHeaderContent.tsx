'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useModalStore } from '@/stores/modal';
import ProfileModal from '@/components/service/profile/ProfileModal/ProfileModal';
import { logout } from '@/actions/logout';

type Props = {
  id: string;
  name: string;
  email: string;
};

export const ProfileHeaderContent = ({ id, name, email }: Props) => {
  const { openModal } = useModalStore();

  const clickProfile = () => {
    openModal({
      title: '나의 정보',
      component: <ProfileModal id={id} email={email} />,
    });
  };

  const handleLogout = async () => {
    await logout();
  };

  return (
    <nav className="flex items-center justify-between m-[6px]">
      <div className="flex items-center gap-2">
        <Avatar>
          <AvatarImage
            src="unlocked/IMG3.webp"
            alt="profile"
            className="w-full h-full rounded-[inherit] object-cover object-top scale-120 border-3 border-primary"
          />
          <AvatarFallback className="bg-white">U</AvatarFallback>
        </Avatar>
        <p className="text-lg">{name}</p>
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
