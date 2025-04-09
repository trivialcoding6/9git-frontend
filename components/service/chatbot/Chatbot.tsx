'use client';

import { useState } from 'react';
import { ChatbotHeader } from './ChatbotHeader';
import { ChatbotIntro } from './ChatbotIntro';
import { ChatbotSelection } from './ChatbotSelection';
import { Chating } from './Chating';

export const Chatbot = () => {
  const [step, setStep] = useState<'intro' | 'chating'>('intro');
  const [selectedOption, setSelectedOption] = useState<{
    title: string;
    description: string;
  } | null>(null);

  const handleSelection = (option: { title: string; description: string }) => {
    setSelectedOption(option);
    setStep('chating');
  };

  const handleReset = () => {
    setSelectedOption(null);
    setStep('intro');
  };

  return (
    <div className="flex flex-col h-full w-[440px] bg-beige-base">
      <ChatbotHeader onReset={handleReset} />

      {step === 'intro' && (
        <>
          <ChatbotIntro showSelectBox={true} />
          <ChatbotSelection onSelect={handleSelection} />
        </>
      )}

      {step === 'chating' && selectedOption && (
        <>
          <ChatbotIntro showSelectBox={false} />
          <Chating selected={selectedOption} />
        </>
      )}
    </div>
  );
};
