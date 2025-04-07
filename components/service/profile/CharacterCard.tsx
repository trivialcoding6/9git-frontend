'use client';

import * as React from 'react';
import Image from 'next/image';
import {
  Profile_CharacterCardImage_WIDTH,
  Profile_CharacterCardImage_HEIGHT,
} from '@/constants/character';
import { cn } from '@/lib/utils';

type CharacterCardProps = {
  imageLink: string;
  isLocked: boolean;
  name: string;
  className?: string;
};

function CharacterCard({ imageLink, isLocked, name, className }: CharacterCardProps) {
  const displayName = isLocked ? '???' : name;
  const altText = isLocked ? `잠긴 캐릭터: ${name}` : `캐릭터: ${name}`;

  return (
    // 카드 배경
    <div
      data-slot="character-card"
      className={cn(
        'w-32 h-48 bg-orange-100 shadow-[2px_2px_4px_0px_rgba(246,209,165,1.00)] rounded-md',
        className
      )}
    >
      <div className="flex flex-col items-center justify-center">
        {/* 이미지 */}
        <Image
          src={`/${imageLink}`}
          alt={altText}
          width={Profile_CharacterCardImage_WIDTH}
          height={Profile_CharacterCardImage_HEIGHT}
          className="object-contain"
        />
        {/* 캐릭터 이름 */}
        <span className="text-black text-base font-normal tracking-tight">{displayName}</span>
      </div>
    </div>
  );
}

export { CharacterCard };
