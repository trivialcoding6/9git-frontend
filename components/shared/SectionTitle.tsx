import { ReactNode } from 'react';

type Props = {
  icon: ReactNode;
  text: string;
};

export const SectionTitle = ({ icon, text }: Props) => {
  return (
    <div className="flex items-center gap-2 text-secondary text-xl mb-2">
      {icon}
      <span>{text}</span>
    </div>
  );
};
