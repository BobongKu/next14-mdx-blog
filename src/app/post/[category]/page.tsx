import { Metadata } from 'next';

import PostListPage from '@/components/post_list/PostListPage';
import { baseDomain, blogName, blogThumbnailURL } from '@/config/const';
import { getCategoryList, getCategoryPublicName } from '@/lib/post';

type Props = {
  // [수정] params를 Promise로 감싸거나,
  // props 자체를 타입으로 사용합니다.
  params: Promise<{ category: string }>;
};

// 허용된 param 외 접근시 404

export async function generateStaticParams() {
  const categoryList = await getCategoryList();
  const paramList = categoryList.map((category) => ({ category }));
  return paramList;
}

// [수정] props를 통째로 받고, 내부에서 params를 await 합니다.
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params; // 수정된 부분
  const cg = getCategoryPublicName(category);
  const title = `${cg} | ${blogName}`;
  const url = `${baseDomain}/${category}`;

  return {
    title,
    openGraph: {
      title,
      url,
      images: [blogThumbnailURL],
    },
    twitter: {
      title,
      images: [blogThumbnailURL],
    },
  };
}

// [수정] props를 통째로 받고, 내부에서 params를 await 합니다.
const CategoryPage = async ({ params }: Props) => {
  const { category } = await params; // 수정된 부분
  return <PostListPage category={category} />;
};

export default CategoryPage;