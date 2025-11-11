import CategoryList from './CategoryList';
import PostCard from './PostCard';
import { getAllPostCount, getCategoryDetailList, getSortedPostList } from '@/lib/post';
// ▼▼▼ [수정] PixelCanvasRegistry를 여기서 import 합니다. ▼▼▼
import PixelCanvasRegistry from '@/components/common/PixelCanvas';

interface PostListProps {
  category?: string;
}

const PostListPage = async ({ category }: PostListProps) => {
  const postList = await getSortedPostList(category);
  const categoryList = await getCategoryDetailList();
  const allPostCount = await getAllPostCount();

  return (
    <section className='mx-auto w-full max-w-[950px] px-4'>
      {/* ▼▼▼ [수정] Web Component를 페이지에서 한 번만 등록합니다. ▼▼▼ */}
      <PixelCanvasRegistry />

      <CategoryList
        allPostCount={allPostCount}
        categoryList={categoryList}
        currentCategory={category}
      />
      <section>
        { 
          postList.length == 0 ? <div className='flex items-center justify-center'>not found</div>:           
          <ul className='grid grid-cols-1 gap-8'> 
            {postList.map((post) => (
              <PostCard key={post.url + post.date} post={post} />
            ))}
          </ul>
        }
      </section>
    </section>
  );
};

export default PostListPage;