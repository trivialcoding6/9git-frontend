import { useModalStore } from '@/stores/modal';
import { PawPrint } from 'lucide-react';

export function AnalysisPopup() {
  const { closeModal } = useModalStore();
  return (
    <div className="bg-[#FFF6EC] rounded-xl p-4 text-xl text-secondary">
      <p className="whitespace-pre-line text-center">
        다른 목표를 원하시나요?{`\n`}아래 챗봇에게 최종 목표를 알려주시면,{`\n`}더 구체적인 목표를
        추천해드릴게요!
      </p>
      <div className="flex justify-center mt-3">
        <button
          className="bg-primary-light border-primary border-2 text-secondary text-xl px-4 py-1 rounded-full shadow cursor-pointer flex items-center gap-1"
          onClick={closeModal}
        >
          확인
          <PawPrint className="w-4.5 h-4.5 fill-secondary" />
        </button>
      </div>
    </div>
  );
}
