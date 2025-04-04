import { Checkbox } from '@/components/ui/checkbox';

interface CustomCheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export default function CustomCheckbox({ label, checked, onChange }: CustomCheckboxProps) {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        checked={checked}
        onCheckedChange={onChange}
        className="w-[18px] h-[18px] border-[2px] border-[#744D2C] data-[state=checked]:bg-[#FCAA2B] data-[state=checked]:border-[#FCAA2B]"
        id={label}
      />
      <label htmlFor={label} className="text-[10px] font-medium text-[#7F4E28]">
        {label}
      </label>
    </div>
  );
}
