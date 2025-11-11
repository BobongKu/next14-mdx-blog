import { Metadata } from 'next';

import FloatingButton from '@/components/common/FloatingButton';
import Giscus from '@/components/post_detail/Giscus';
import { PostBody } from '@/components/post_detail/PostBody';
import { PostHeader } from '@/components/post_detail/PostHeader';
import TocSidebar from '@/components/post_detail/TableOfContentSidebar';
import TocTop from '@/components/post_detail/TableOfContentTop';
import { baseDomain } from '@/config/const';
import { getPostDetail, getPostPaths, parsePostAbstract, parseToc } from '@/lib/post';

type Props = {
  // [수정] params를 Promise로 감싸줍니다. (Next.js 15+ 방식)
  params: Promise<{ category: string; slug: string }>;
};

// 허용된 param 외 접근시 404
export const dynamicParams = false;

// [수정] 전체 props를 받고, 내부에서 props.params를 await 합니다.
export async function generateMetadata(props: Props): Promise<Metadata> {
  const { category, slug } = await props.params; // 수정된 부분
  const post = await getPostDetail(category, slug);

  const title = `${post.title} | Bobong`;
  const imageURL = `${baseDomain}${post.thumbnail}`;

  return {
    title,
    description: post.desc,

    openGraph: {
      title,
      description: post.desc,
      type: 'article',
      publishedTime: post.date.toISOString(),
      url: `${baseDomain}${post.url}`,
      images: [imageURL],
    },
    twitter: {
      title,
      description: post.desc,
      images: [imageURL],
    },
  };
}

export function generateStaticParams() {
  const postPaths: string[] = getPostPaths();
  const paramList = postPaths
    .map((path) => parsePostAbstract(path))
    .map((item) => ({ category: item.categoryPath, slug: item.slug }));
  return paramList;
}

// [수정] 전체 props를 받고, 내부에서 props.params를 await 합니다.
const PostDetail = async (props: Props) => {
  const { category, slug } = await props.params; // 수정된 부분
  const post = await getPostDetail(category, slug);
  const toc = parseToc(post.content);
  return (
    <div className='prose dark:prose-invert mx-auto w-full max-w-[750px] px-5 :prose-invert sm:px-6'>
      <PostHeader post={post} />
      <TocTop toc={toc} />
      <article className='relative'>
        <TocSidebar toc={toc} />
        <PostBody post={post} />
      </article>
      <hr />
      <Giscus />
    </div>
  );
};

export default PostDetail;