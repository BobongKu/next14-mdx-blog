import { Metadata } from 'next';

import PostListPage from '@/components/post_list/PostListPage';
import { baseDomain, blogName, blogThumbnailURL } from '@/config/const';
import { getCategoryList, getCategoryPublicName } from '@/lib/post';

type Props = {
  params: { category: string };
};

// 허용된 param 외 접근시 404

export async function generateStaticParams() {
  const categoryList = await getCategoryList();
  const paramList = categoryList.map((category) => ({ category }));
  return paramList;
}

export async function generateMetadata({ params: { category } }: Props): Promise<Metadata> {
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

const CategoryPage = async ({ params:{category}}: Props) => {
  return <PostListPage category={category} />;
};

export default CategoryPage;
