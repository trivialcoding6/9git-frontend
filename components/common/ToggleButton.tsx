type ToggleButtonProps = {
  item: string;
  isSelected: boolean;
  onToggle: (item: string) => void;
  selectedClassName?: string;
  unselectedClassName?: string;
  className?: string;
  children: React.ReactNode;
};

export const ToggleButton = ({
  item,
  isSelected,
  onToggle,
  selectedClassName,
  unselectedClassName,
  className,
  children,
  ...props
}: ToggleButtonProps) => {
  return (
    <button
      onClick={() => onToggle(item)}
      className={`transition-all focus:outline-none ${
        isSelected ? selectedClassName : unselectedClassName
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
