import { CharacterCard } from './CharacterCard';

type Props = {
  characters: Array<{
    name: string;
    imageLink: string;
    isLocked: boolean;
  }>;
};

export const CharacterGrid = ({ characters }: Props) => {
  return (
    <div className="grid grid-cols-3 justify-items-center px-4 mb-2 gap-4 mt-6 h-[550px] overflow-y-scroll scrollbar-hide">
      {characters.map((character) => (
        <CharacterCard key={character.imageLink} {...character} />
      ))}
    </div>
  );
};
