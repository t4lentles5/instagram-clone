import { getPostById } from '@/actions/post/get-post-by-id';
import { notFound } from 'next/navigation';

type Props = {
  params: Promise<{
    postId: string;
  }>;
};

export default async function PostPage({ params }: Props) {
  const { postId } = await params;
  const post = await getPostById(postId);

  if (!post) {
    notFound();
  }

  return <div className="mt-2 grid place-content-center">{postId}</div>;
}
