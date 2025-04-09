import { Header } from '@/components/shared/Header';
import { ProfileHeaderContent } from './ProfileHeaderContent';
import { UserStats } from './UserStats';
import CharacterGridHeader from './CharacterGridHeader';
import { CharacterGrid } from './CharacterGrid';
import { DUMMY_CHARACTER_LIST } from '@/constants/character';
export const Profile = () => {
  return (
    <div className="h-full bg-beige-light">
      <Header>
        <ProfileHeaderContent />
      </Header>
      <UserStats />
      <CharacterGridHeader />
      <CharacterGrid characters={DUMMY_CHARACTER_LIST} />
    </div>
  );
};
