'use client';

import Link from 'next/link';

import { ScrollToComment, ScrollTop } from '../common/TocButtons';
import { HeadingItem } from '@/config/types';
import { useHeadingsObserver } from '@/hook/useHeadingsObserver';
import { cn } from '@/lib/utils';

interface Props {
  toc: HeadingItem[];
}

const TableOfContent = ({ toc }: Props) => {
  const activeIdList = useHeadingsObserver('h2, h3');

  return (
    <aside className='not-prose absolute -top-[200px] left-full -mb-[100px] hidden h-[calc(100%+150px)] xl:block '>
      <div className='sticky bottom-0  top-[200px] z-10 ml-[5rem] mt-[200px] w-[200px]'>
        <div className='mb-4 border-l px-4 py-2'>
          <div className='mb-1 font-bold'>On this page</div>
          <ul className='text-xs'>
            {toc.map((item) => {
              const isH3 = item.indent === 1;
              const isIntersecting = activeIdList.includes(item.link);
              return (
                <li
                  key={item.link}
                  className={cn(
                    isH3 && 'ml-4',
                    isIntersecting && 'font-medium text-pink-600',
                    'py-1 transition'
                  )}
                >
                  <Link href={item.link}>
                  <span className="group text-black dark:text-white transition-all duration-300 ease-in-out">
            <span className="bg-left-bottom bg-gradient-to-r from-black to-white dark:from-white dark:to-black bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
            {item.text}
            </span>
            </span></Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div className='flex gap-2'>
          <ScrollTop />
          <ScrollToComment />
        </div>
      </div>
    </aside>
  );
};

export default TableOfContent;
