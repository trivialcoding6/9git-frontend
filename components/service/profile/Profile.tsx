import { Header } from '@/components/shared/Header';
import { ProfileHeaderContent } from './ProfileHeaderContent';
import { CharacterGrid } from './CharacterGrid';
import { DUMMY_CHARACTER_LIST } from '@/constants/character';
export const Profile = () => {
  return (
    <>
      <Header>
        <ProfileHeaderContent />
      </Header>
      <CharacterGrid characters={DUMMY_CHARACTER_LIST} />
    </>
  );
};
