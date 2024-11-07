
import { Post } from '@/config/types';
import { CalendarDays, Clock3 } from 'lucide-react';
import { TransitionLink } from '../common/TransitionLink';

interface Props {
  post: Post;
}

export const PostHeader = ({ post }: Props) => {
  return (
    <header className='mt-14 text-center'>
      <h1 className='mb-3 text-3xl'>{post.title}</h1>
      <div className='mb-3'>
        <TransitionLink
          href={`/post/${post.categoryPath}`}
        >
          <span className="group text-black dark:text-white transition-all duration-300 ease-in-out">
            <span className="bg-left-bottom bg-gradient-to-r from-black to-white dark:from-white dark:to-black bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
              {post.categoryPublicName}
            </span>
          </span>
        </TransitionLink>
      </div>
      <div className='flex justify-center gap-3 text-sm text-gray-500 dark:text-gray-400'>
        <div className='flex items-center gap-1'>
          <CalendarDays className='w-3.5' />
          <span>{post.dateString}</span>
        </div>
        <div className='flex items-center gap-1'>
          <Clock3 className='w-3.5' />
          <span>{post.readingMinutes}분</span>
        </div>
      </div>
      <hr className='mt-5' />
    </header>
  );
};
