import { PawPrint } from 'lucide-react';

type Props = {
  value: number;
  title: string;
  emoji?: string;
  titleColor?: string;
  color?: string;
};

export function ProgressBar({ value, title, titleColor, color }: Props) {
  return (
    <div className="space-y-1">
      <div className="flex items-center gap-2">
        <PawPrint className="fill-primary text-primary w-4 h-4" />
        <span className={`text-lg ${titleColor}`}>{title}</span>
      </div>
      <div className="w-full bg-beige-deco rounded-full h-2">
        <div
          className={`h-2 rounded-full transition-all duration-300 ${
            color ? `bg-[${color}]` : 'bg-primary'
          }`}
          style={{ width: `${value}%` }}
        />
      </div>
      <p className="text-sm text-gray-500">{value}% 달성</p>
    </div>
  );
}
