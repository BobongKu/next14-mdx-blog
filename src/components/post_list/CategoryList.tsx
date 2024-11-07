'use client';

import { useRouter } from 'next/navigation';

import { CategoryButton } from './CategoryButton';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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
        <ul className='flex gap-3'>
          <CategoryButton
            href='/post'
            isCurrent={currentCategory === 'all'}
            displayName='All'
            count={allPostCount}
          />
          {categoryList.map((cg) => (
            <CategoryButton
              key={cg.dirName}
              href={`/post/${cg.dirName}`}
              displayName={cg.publicName}
              isCurrent={cg.dirName === currentCategory}
              count={cg.count}
            />
          ))}
        </ul>
      </section>
    </>
  );
};

export default CategoryList;
