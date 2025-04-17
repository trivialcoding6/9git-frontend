'use client';

import { Header } from '@/components/shared/Header';
import { ProfileHeaderContent } from './ProfileHeaderContent';
import { UserStats } from './UserStats';
import CharacterGridHeader from './CharacterGridHeader';
import { CharacterGrid } from './CharacterGrid';

import { useUserStore } from '@/stores/user';
import { getProfileItems, ProfileResponse } from '@/apis/profile';
import { getCharacterItems, CharacterResponse } from '@/apis/character';
import { useEffect, useState } from 'react';

export const Profile = () => {
  const user = useUserStore((state) => state.user);

  const [profile, setProfile] = useState<ProfileResponse>();
  const [characters, setCharacters] = useState<Array<CharacterResponse>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user?.id) return;

      try {
        setIsLoading(true);
        const profileResponse = await getProfileItems(user.id);
        setProfile(profileResponse);
        const characterResponse = await getCharacterItems(user.id);
        setCharacters(characterResponse);
      } catch (e) {
        console.error('프로필 로딩 실패 :', e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [user?.id]);

  if (isLoading) return <div>프로필 로딩 중...</div>;
  if (!profile || !user?.id) return null;

  return (
    <div className="h-full bg-beige-light">
      <Header>
        <ProfileHeaderContent id={user.id} name={profile.name} email={profile.email} />
      </Header>

      <UserStats
        level={profile.level}
        exp={profile.exp}
        completedTodoCount={profile.completedTodoCount}
      />

      <CharacterGridHeader characterCount={profile.characterCount} />
      <CharacterGrid
        characters={characters.map((c) => ({
          imageLink: c.imageLink,
          isLocked: !c.isCollected,
          name: c.characterName,
        }))}
      />
    </div>
  );
};
