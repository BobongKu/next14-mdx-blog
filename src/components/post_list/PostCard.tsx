'use client'; // PostListClient의 자식이므로 클라이언트 컴포넌트입니다.

import { Post } from '@/config/types';
import { CalendarDays, Clock3 } from 'lucide-react';
import { TransitionLink } from '../common/TransitionLink';

import '@/config/PixelCard.css'; // CSS 파일을 import합니다.

interface Props {
  post: Post;
}

// 카테고리별 색상 매핑
const getCategoryColors = (category: string) => {
  // CSS의 var(--active-color)와 픽셀 팔레트를 정의합니다.
  switch (category.toLowerCase()) {
    case 'basic skill':
      return {
        active: '#e0f2fe', // sky-100
        palette: '#e0f2fe,#7dd3fc,#0ea5e9' // sky-100, sky-300, sky-500
      };
    case 'advanced skill':
      return {
        active: '#fecdd3', // rose-200
        palette: '#fecdd3,#fda4af,#e11d48' // rose-200, rose-300, rose-600
      };
    case 'development':
      return {
        active: '#fef08a', // yellow-200
        palette: '#fef08a,#fde047,#eab308' // yellow-200, yellow-400, yellow-600
      };
    case 'etc':
      return {
        active: '#dcfce7', // green-100
        palette: '#dcfce7,#86efac,#22c55e' // green-100, green-300, green-500
      };
    default:
      return {
        active: '#e3e3e3', // 기본값 (fg)
        palette: '#f8fafc,#f1f5f9,#cbd5e1' // 기본값 (slate)
      };
  }
};

const PostCard = ({ post }: Props) => {
  const colors = getCategoryColors(post.categoryPublicName);

  return (
    <>
      <TransitionLink href={post.url}>
        {/* [수정] className="h-full"을 <li>로 이동 */}
        <li
          className='card h-full' 
          style={{ '--active-color': colors.active } as React.CSSProperties}
        >
          <pixel-canvas
            data-gap="5"
            data-speed="35"
            data-colors={colors.palette} // 픽셀 색상 팔레트 전달
          ></pixel-canvas>

          {/* CSS에서 스타일을 제어할 수 있도록 card-content로 묶습니다. */}
          <div className='card-content'>
            <div>
              {/* [수정] CSS 선택자가 인식할 수 있도록 'card-category' 클래스 추가 */}
              <div className='card-category text-sm font-medium pt-2'>
                {post.categoryPublicName}
              </div>
              {/* [수정] CSS 선택자가 인식할 수 있도록 'card-title' 클래스 추가 */}
              <h2 className='card-title mt-1 text-lg font-bold sm:text-xl md:text-lg'>
                {post.title}
              </h2>
            </div>
            
            {/* [수정] CSS 선택자가 인식할 수 있도록 'card-footer' 클래스 추가 */}
            <div className='card-footer'>
              <div className='icon-text'>
                <CalendarDays className='w-3.5' />
                <span>{post.dateString}</span>
              </div>
              <div className='icon-text'>
                <Clock3 className='w-3.5' />
                <span>{post.readingMinutes}분</span>
              </div>
            </div>
          </div>
        </li>
      </TransitionLink>
    </>
  );
};

export default PostCard;