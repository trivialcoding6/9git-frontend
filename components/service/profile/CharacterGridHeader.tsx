'use client';

import { BookOpen } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export default function CharacterGridHeader() {
  return (
    <div className="bg-beige-base rounded-xl shadow-md p-4 w-105 max-w-md mx-auto mt-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2 ">
          <BookOpen size={24} className="text-primary ml-3" />
          <span className="text-lg font-bold text-black ml-2">고양이 도감</span>
        </div>
        <div className="text-sm font-semibold text-primary">
          4 <span className="text-black mr-3">/ 30</span>
        </div>
      </div>
      <Separator className="bg-beige-deco mt-2 mb-2" />
      <div className="flex gap-3 ml-2">
        <button className="bg-primary text-white font-bold text-sm rounded-md px-4 py-2 shadow-sm">
          ALL
        </button>
        <button className="bg-white text-secondary font-semibold text-sm rounded-md px-4 py-2 shadow-sm">
          수집됨
        </button>
        <button className="bg-white text-secondary font-semibold text-sm rounded-md px-4 py-2 shadow-sm">
          미수집
        </button>
      </div>
    </div>
  );
}
