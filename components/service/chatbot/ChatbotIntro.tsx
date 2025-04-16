'use client';

import Image from 'next/image';
import { ChevronDown } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Category } from '@/types/category';
import { getCategoryItems } from '@/apis/category';
import { useRouter, useSearchParams } from 'next/navigation';

type Props = {
  showSelectBox: boolean;
};

export const ChatbotIntro = ({ showSelectBox }: Props) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        const categories = await getCategoryItems();
        setCategories(categories);

        // 카테고리 로드 후, 파라미터가 없고 카테고리가 있으면 첫 번째 카테고리로 설정
        if (categories.length > 0 && !searchParams.get('categoryId') && showSelectBox) {
          const params = new URLSearchParams(searchParams.toString());
          params.set('categoryId', categories[0].id);
          router.push(`${window.location.pathname}?${params.toString()}`);
        }
      } catch (error) {
        console.error('카테고리 로드 실패:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCategories();
  }, [showSelectBox]);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const categoryId = e.target.value;
    const params = new URLSearchParams(searchParams.toString());

    if (categoryId) {
      params.set('categoryId', categoryId);
    } else {
      params.delete('categoryId');
    }

    // 현재 경로에 새 쿼리 파라미터를 추가하여 이동
    router.push(`${window.location.pathname}?${params.toString()}`);
  };

  const SelectSkeleton = () => (
    <div className="relative mr-5">
      <div className="animate-pulse w-18 h-8 px-2.5 py-1 border-2 border-gray-200 rounded-md bg-gray-100">
        <div className="h-4 bg-gray-200 rounded"></div>
      </div>
    </div>
  );

  return (
    <div className="flex items-center justify-between p-2 bg-beige-light w-full max-w-xl mx-auto sticky top-0">
      {/* 캐릭터 + 텍스트 */}
      <div className="flex items-center space-x-4 ml-3">
        <div className="relative w-16 h-24 rounded overflow-hidden">
          <Image
            src="/chatbot-image.webp"
            alt="AI 챗봇 깃냥이"
            fill
            className="object-cover rounded"
            sizes="64px"
          />
        </div>

        <div className="text-secondary text-sm">
          <p>
            야옹~ 나는 <span className="text-primary">ai챗봇 깃냥이</span>다 냥!
          </p>
          <p>어떤 걸 도와줄까 냥!🐾</p>
        </div>
      </div>

      {/* 셀렉트 박스 */}
      {showSelectBox && (
        <>
          {isLoading ? (
            <SelectSkeleton />
          ) : (
            <div className="relative mr-5">
              <select
                className="appearance-none w-18 px-2.5 py-1 border-2 border-primary rounded-md bg-white text-secondary font-sm focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
                onChange={handleCategoryChange}
                value={
                  searchParams.get('categoryId') || (categories.length > 0 ? categories[0].id : '')
                }
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.categoryName}
                  </option>
                ))}
              </select>

              <div className="pointer-events-none absolute top-1/2 right-2 transform -translate-y-1/2 text-primary">
                <ChevronDown className="w-4 h-4" />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};
