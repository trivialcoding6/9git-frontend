// ProgressBar.tsx
type Props = {
  value: number;
  title: string;
  emoji?: string;
  titleColor?: string;
};

export function ProgressBar({ value, title, emoji, titleColor }: Props) {
  return (
    <div className="space-y-1">
      <div className="flex items-center gap-2">
        {emoji && <span className="text-lg">{emoji}</span>}
        <span className={`font-semibold text-sm ${titleColor}`}>{title}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-[#FBAA24] h-2 rounded-full transition-all duration-300"
          style={{ width: `${value}%` }}
        ></div>
      </div>
      <p className="text-xs text-gray-500">{value}% 달성</p>
    </div>
  );
}
