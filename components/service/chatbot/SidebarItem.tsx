'use client';

import { useState } from 'react';
import { FolderOpen, Pencil, Trash2, Check, X } from 'lucide-react';
import Link from 'next/link';
import { DUMMY_PREVIOUS_CONVERSATIONS } from '@/constants/chatbot_storage';
import { ActionButton } from '@/components/common/ActionButton';

export const SidebarItem = () => {
  const [editIndex, setEditIndex] = useState<string | null>(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedDescription, setEditedDescription] = useState('');

  const groupedByCategory = DUMMY_PREVIOUS_CONVERSATIONS.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, typeof DUMMY_PREVIOUS_CONVERSATIONS>);

  const handleEditClick = (id: string, title: string, description: string) => {
    setEditIndex(id);
    setEditedTitle(title);
    setEditedDescription(description);
  };

  const handleEditSave = (id: string) => {
    console.log(`수정된 ID: ${id}, 제목: ${editedTitle}, 설명: ${editedDescription}`);
    setEditIndex(null); // 저장 후 편집 모드 종료
  };

  return (
    <div className="p-4 space-y-6 overflow-y-auto text-secondary">
      {Object.entries(groupedByCategory).map(([category, items]) => (
        <div key={category}>
          <div className="flex items-center gap-2 font-bold text-[17px] mb-1">
            <FolderOpen size={18} />
            <span>{category}</span>
          </div>

          <ul className="pl-2 space-y-1">
            {items.map((item, idx) => {
              const itemId = `${item.category}-${item.date}-${idx}`;
              const isEditing = editIndex === itemId;

              return (
                <li key={itemId} className="flex justify-between items-center gap-2">
                  {isEditing ? (
                    <div className="flex flex-col gap-1 max-w-[220px]">
                      <input
                        className="text-sm border px-2 py-1 rounded"
                        value={editedTitle}
                        onChange={(e) => setEditedTitle(e.target.value)}
                      />
                      <input
                        className="text-sm border px-2 py-1 rounded"
                        value={editedDescription}
                        onChange={(e) => setEditedDescription(e.target.value)}
                      />
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className="text-sm hover:underline text-left truncate max-w-[220px]"
                    >
                      [{item.date.slice(2)}] {item.title} - {item.description}
                    </Link>
                  )}

                  <span className="flex gap-1">
                    {isEditing ? (
                      <>
                        <ActionButton
                          icon={<Check size={16} />}
                          onClick={() => handleEditSave(itemId)}
                        />
                        <ActionButton icon={<X size={16} />} onClick={() => setEditIndex(null)} />
                      </>
                    ) : (
                      <>
                        <ActionButton
                          icon={<Pencil size={16} />}
                          onClick={() => handleEditClick(itemId, item.title, item.description)}
                        />
                        <ActionButton
                          icon={<Trash2 size={16} />}
                          onClick={() => console.log(`삭제: ${item.title}`)}
                        />
                      </>
                    )}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
};
