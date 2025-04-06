'use client';

import * as React from 'react';
import Image from 'next/image';
import {
  Profile_CharacterCardImage_WIDTH,
  Profile_CharacterCardImage_HEIGHT,
  CHARACTER_NAME_MAP,
} from '@/constants/CharacterCardImage';
import { cn } from '@/lib/utils';

type CharacterCardProps = {
  imageId: string; // 예: 'IMG1'
  isLocked: boolean;
  className?: string;
};

const CHARACTER_IMAGE_PATH = '';

function CharacterCard({ imageId, isLocked, className }: CharacterCardProps) {
  const name = CHARACTER_NAME_MAP[imageId] || '이름 없음';
  const displayName = isLocked ? '???' : name;
  const imageFileName = `${imageId}.webp`;
  const imageSrc = `${CHARACTER_IMAGE_PATH}/${isLocked ? 'locked' : 'unlocked'}/${imageFileName}`;
  const altText = isLocked ? `잠긴 캐릭터: ${name}` : `캐릭터: ${name}`;

  return (
    // 카드 배경
    <div data-slot="character-card" className={cn('w-34 h-42 relative', className)}>
      <div className="absolute inset-0 bg-orange-100 shadow-[2px_2px_4px_0px_rgba(246,209,165,1.00)] rounded-md" />
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {/* 이미지 */}
        <Image
          src={imageSrc}
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

// 예시 코드
// <CharacterCard imageId="IMG1" isLocked={true} />
// <CharacterCard imageId="IMG2" isLocked={false} />
