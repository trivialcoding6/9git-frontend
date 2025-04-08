'use client';

import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from 'lucide-react';
import React, { useState } from 'react';

const occupations = [
  '사무직',
  '연구·개발직',
  '서비스직',
  '생산직',
  '공무원',
  '프리랜서',
  '자영업자',
  '군인',
  '취업 준비생',
  '대학생',
  '고등학생 이하',
  '무직',
  '기타',
] as const;

export type Job = (typeof occupations)[number];

type Props = {
  selectedJob: Job | ''; // 선택된 직업
  setSelectedJob: (job: Job | '') => void; // 사용자가 드롭다운에서 직업을 선택했을 때 실행되는 함수
};

const JobSelectbar: React.FC<Props> = ({ selectedJob, setSelectedJob }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="space-y-2">
      <label className="text-lg font-bold text-secondary">직업</label>
      <div className="space-y-2"></div>

      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full rounded border border-beige-deco bg-beige-light text-secondary text-sm px-3 py-1 placeholder:text-beige-deco shadow-sm focus:outline-none focus:ring-1 focus:ring-secondary appearance-none flex items-center justify-between"
        >
          <span>{selectedJob || <span className="text-beige-deco">직업을 선택하세요.</span>}</span>
          <ChevronDownIcon className="size-4 opacity-50" />
        </button>
        {isOpen && (
          <ul className="absolute z-10 w-full bg-beige-light border border-beige-deco rounded-l-lg mt-1 max-h-50 overflow-y-auto">
            {occupations.map((job) => (
              <li
                key={job}
                onClick={() => {
                  setSelectedJob(job);
                  setIsOpen(false);
                }}
                className="px-4 py-1.5 cursor-pointer text-secondary text-sm hover:bg-beige-deco"
              >
                {job}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default JobSelectbar;
