// src/components/post_list/CategoryList.tsx

'use client';

import { useRouter } from 'next/navigation';

import { CategoryButton } from './CategoryButton';
import { CategoryDetail } from '@/config/types';

interface CategoryListProps {
  categoryList: CategoryDetail[];
  allPostCount: number;
  currentCategory?: string;
}

const CategoryList = ({
  categoryList,
  allPostCount,
  currentCategory = 'all',
}: CategoryListProps) => {
  const router = useRouter();

  const onCategoryChange = (value: string) => {
    if (value === 'all') {
      router.push('/post');
    } else {
      router.push(`/post/${value}`);
    }
  };

  return (
    <>
      <section className='mb-10  block'>
        <ul className='flex flex-wrap gap-3'> {/* [수정] flex-wrap 추가 (줄바꿈대비) */}
          <CategoryButton
            href='/post'
            isCurrent={currentCategory === 'all'}
            displayName='All'
            count={allPostCount}
            categoryPublicName='All' /* [수정] prop 이름 및 값 변경 */
          />
          {categoryList.map((cg) => (
            <CategoryButton
              key={cg.dirName}
              href={`/post/${cg.dirName}`}
              displayName={cg.publicName}
              isCurrent={cg.dirName === currentCategory}
              count={cg.count}
              categoryPublicName={cg.publicName} /* [수정] prop 이름 및 값 변경 */
            />
          ))}
        </ul>
      </section>
    </>
  );
};

export default CategoryList;