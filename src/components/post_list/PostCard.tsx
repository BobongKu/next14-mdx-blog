import { Post } from '@/config/types';
import { CalendarDays, Clock3 } from 'lucide-react';
import { TransitionLink } from '../common/TransitionLink';

interface Props {
  post: Post;
}

const PostCard = ({ post }: Props) => {
  return (
    <TransitionLink href={post.url}>
      <li className='z-0 group flex h-full flex-col gap-4 overflow-hidden rounded-md border shadow-md transition hover:shadow-xl dark:border-slate-700 dark:hover:border-white'>
        <div className='flex flex-1 flex-col justify-between p-4 pt-1'>
          <div>
            <div className='text-sm font-medium text-gray-500 lg:text-base pt-2'>
              {post.categoryPublicName}
            </div>
            <h2 className='mt-1 text-lg font-bold sm:text-xl md:text-lg' >
            <span className="group text-black dark:text-white transition-all duration-300 ease-in-out">
            <span className="bg-left-bottom bg-gradient-to-r from-black to-white dark:from-white dark:to-black bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
              {post.title}
            </span>
            </span>
            </h2> 
          </div>
          <div className='flex justify-between gap-3 text-sm text-gray-500 dark:text-gray-400'>
            <div className='flex items-center gap-1'>
              <CalendarDays className='w-3.5' />
              <span>{post.dateString}</span>
            </div>
            <div className='flex items-center gap-1'>
              <Clock3 className='w-3.5' />
              <span>{post.readingMinutes}분</span>
            </div>
          </div>
        </div>
      </li>
    </TransitionLink>
  );
};

export default PostCard;
