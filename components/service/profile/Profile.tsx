import { Header } from '@/components/shared/Header';
import { ProfileHeaderContent } from './ProfileHeaderContent';
import { CharacterCard } from './CharacterCard';

export const Profile = () => {
  return (
    <>
      <Header>
        <ProfileHeaderContent />
      </Header>
      <div className="py-4 space-y-4"></div>

      <div className="px-4 mb-2 space-y-4">
        <div className="flex gap-3 justify-center">
          <CharacterCard imageId="IMG1" isLocked={false} />
          <CharacterCard imageId="IMG2" isLocked={true} />
          <CharacterCard imageId="IMG3" isLocked={true} />
        </div>
      </div>
      <div className="px-4 mb-2 space-y-4">
        <div className="flex gap-3 justify-center">
          <CharacterCard imageId="IMG4" isLocked={false} />
          <CharacterCard imageId="IMG5" isLocked={true} />
          <CharacterCard imageId="IMG6" isLocked={false} />
        </div>
      </div>
      <div className="px-4 mb-2 space-y-4">
        <div className="flex gap-3 justify-center">
          <CharacterCard imageId="IMG7" isLocked={false} />
          <CharacterCard imageId="IMG8" isLocked={true} />
          <CharacterCard imageId="IMG9" isLocked={true} />
        </div>
      </div>
      <div className="px-4 mb-2 space-y-4">
        <div className="flex gap-3 justify-center">
          <CharacterCard imageId="IMG10" isLocked={false} />
          <CharacterCard imageId="IMG11" isLocked={true} />
          <CharacterCard imageId="IMG12" isLocked={false} />
        </div>
      </div>
      <div className="px-4 mb-2 space-y-4">
        <div className="flex gap-3 justify-center">
          <CharacterCard imageId="IMG13" isLocked={false} />
          <CharacterCard imageId="IMG14" isLocked={true} />
          <CharacterCard imageId="IMG15" isLocked={true} />
        </div>
      </div>
      <div className="px-4 mb-2 space-y-4">
        <div className="flex gap-3 justify-center">
          <CharacterCard imageId="IMG16" isLocked={false} />
          <CharacterCard imageId="IMG17" isLocked={true} />
          <CharacterCard imageId="IMG18" isLocked={false} />
        </div>
      </div>
      <div className="px-4 mb-2 space-y-4">
        <div className="flex gap-3 justify-center">
          <CharacterCard imageId="IMG19" isLocked={false} />
          <CharacterCard imageId="IMG20" isLocked={true} />
          <CharacterCard imageId="IMG21" isLocked={true} />
        </div>
      </div>
      <div className="px-4 mb-2 space-y-4">
        <div className="flex gap-3 justify-center">
          <CharacterCard imageId="IMG22" isLocked={false} />
          <CharacterCard imageId="IMG23" isLocked={true} />
          <CharacterCard imageId="IMG24" isLocked={false} />
        </div>
      </div>
      <div className="px-4 mb-2 space-y-4">
        <div className="flex gap-3 justify-center">
          <CharacterCard imageId="IMG25" isLocked={false} />
          <CharacterCard imageId="IMG26" isLocked={true} />
          <CharacterCard imageId="IMG27" isLocked={true} />
        </div>
      </div>
      <div className="px-4 mb-2 space-y-4">
        <div className="flex gap-3 justify-center">
          <CharacterCard imageId="IMG28" isLocked={false} />
          <CharacterCard imageId="IMG29" isLocked={true} />
          <CharacterCard imageId="IMG30" isLocked={false} />
        </div>
      </div>
    </>
  );
};
