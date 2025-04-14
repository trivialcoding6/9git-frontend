import { useModalStore } from '@/stores/modal';

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
          className="bg-[#F68047] text-white text-base  px-4 py-1 rounded-full shadow cursor-pointer"
          onClick={closeModal}
        >
          확인 🐾
        </button>
      </div>
    </div>
  );
}
