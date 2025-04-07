import { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { PencilLine } from 'lucide-react';
import { ActionButton } from '@/components/common/ActionButton';

interface Props {
  onConfirm: () => void;
}

export default function ConsentConfirm({ onConfirm }: Props) {
  const [checked, setChecked] = useState(false);

  const handleCheck = (value: boolean | 'indeterminate') => {
    setChecked(value === 'indeterminate' ? false : value);
  };

  return (
    <div className="flex flex-col space-y-6">
      <div className="flex items-center space-x-2">
        <Checkbox checked={checked} onCheckedChange={handleCheck} id="privacy-check" />
        <label htmlFor="privacy-check" className="text-sm font-base text-secondary">
          개인정보 수집 및 이용에 동의합니다 (필수)
        </label>
      </div>

      <ActionButton onClick={onConfirm}>
        <span
          className={`${
            checked ? 'text-secondary icon-color' : 'text-beige-deco icon-color'
          } flex items-center gap-1`}
        >
          <PencilLine size={16} /> 완료
        </span>
      </ActionButton>
    </div>
  );
}
