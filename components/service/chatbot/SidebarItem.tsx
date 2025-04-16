'use client';

import { useEffect, useState } from 'react';
import { FolderOpen, Pencil, Trash2, Check, X } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ActionButton } from '@/components/common/ActionButton';
import { CategoryWithStorages } from '@/types/storage';
import { getUser } from '@/actions/user';
import { getCategoryItems } from '@/apis/category';
import { getStorage } from '@/apis/storage';
import { SidebarSkeleton } from './SidebarSkeleton';
import { useSidebarStore } from '@/stores/sidebar';

export const SidebarItem = () => {
  const [editIndex, setEditIndex] = useState<string | null>(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedContent, setEditedContent] = useState('');
  const [categoriesWithStorages, setCategoriesWithStorages] = useState<CategoryWithStorages[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { open, setOpen } = useSidebarStore();
  const router = useRouter();

  const handleEditClick = (id: string, title: string) => {
    setEditIndex(id);
    setEditedTitle(title);
  };

  const handleEditSave = (id: string) => {
    // 여기에 실제 저장 로직을 추가해야 합니다
    setEditIndex(null); // 저장 후 편집 모드 종료
  };

  // 채팅방 이동 핸들러
  const handleChatClick = (storageId: string, categoryId: string) => {
    // 사이드바 닫기
    router.push(`/chatbot/s/${storageId}?categoryId=${categoryId}`);
    setOpen(false);

    // 해당 채팅방으로 이동 (쿼리 파라미터 포함)
  };

  // 날짜 포맷 변환 함수 (YYYY-MM-DD 형식의 날짜를 YY.MM.DD 형식으로 변환)
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      const year = date.getFullYear().toString().slice(2); // YY
      const month = (date.getMonth() + 1).toString().padStart(2, '0'); // MM
      const day = date.getDate().toString().padStart(2, '0'); // DD
      return `${year}.${month}.${day}`;
    } catch (e) {
      return dateString; // 변환 실패 시 원본 반환
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. 사용자 정보 가져오기
        const user = await getUser();

        // 2. 카테고리 목록 가져오기
        const categories = await getCategoryItems();

        // 3. 각 카테고리별 스토리지 가져오기
        const categoryStoragesPromises = categories.map(async (category) => {
          const storages = await getStorage({
            userId: user.id,
            categoryId: category.id,
          });

          return {
            categoryId: category.id,
            categoryName: category.categoryName,
            categoryColor: category.categoryColor,
            storages: storages,
          };
        });

        const result = await Promise.all(categoryStoragesPromises);
        setCategoriesWithStorages(result);
        setIsLoading(false);
      } catch (err) {
        console.error('데이터 가져오기 실패:', err);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="p-4 space-y-6 overflow-y-auto text-secondary h-[calc(100%-56px)]">
        <SidebarSkeleton />
        <SidebarSkeleton />
        <SidebarSkeleton />
      </div>
    );
  }

  return (
    <div className="p-4 space-y-6 overflow-y-auto text-secondary h-[calc(100%-56px)]">
      {categoriesWithStorages.map((category) => (
        <div key={category.categoryId}>
          <div className="flex items-center gap-2 font-bold text-[17px] mb-1">
            <FolderOpen size={18} style={{ color: category.categoryColor }} />
            <span>{category.categoryName}</span>
          </div>

          <ul className="pl-2 space-y-1">
            {category.storages.map((storage) => {
              const itemId = `${category.categoryId}-${storage.id}`;
              const isEditing = editIndex === itemId;
              // const formattedDate = formatDate(storage.createdAt);

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
                        value={editedContent}
                        onChange={(e) => setEditedContent(e.target.value)}
                      />
                    </div>
                  ) : (
                    // Link 컴포넌트 대신 버튼으로 변경
                    <button
                      onClick={() => handleChatClick(storage.id, category.categoryId)}
                      className="text-sm hover:underline text-left truncate max-w-[220px]"
                    >
                      {/* [{formattedDate}] {storage.title} - {storage.content} */}
                      {storage.title}
                    </button>
                  )}

                  <span className="flex gap-1">
                    {isEditing ? (
                      <>
                        <ActionButton
                          icon={<Check size={16} />}
                          onClick={() => handleEditSave(itemId)}
                          children={null}
                        />
                        <ActionButton
                          icon={<X size={16} />}
                          onClick={() => setEditIndex(null)}
                          children={null}
                        />
                      </>
                    ) : (
                      <>
                        <ActionButton
                          icon={<Pencil size={16} />}
                          onClick={() => handleEditClick(itemId, storage.title)}
                          children={null}
                        />
                        <ActionButton
                          icon={<Trash2 size={16} />}
                          onClick={() => console.log(`삭제: ${storage.title}`)}
                          children={null}
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
