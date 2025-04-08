'use client';

import React from 'react';

type Props = {
  text: string;
};

export const TextScroll = ({ text }: Props) => {
  return (
    <div className="w-full h-20 overflow-y-scroll bg-white border border-beige-deco px-3 py-2 text-xs whitespace-pre-wrap">
      {text}
    </div>
  );
};
