import { notFound } from 'next/navigation';

import { getPostById } from '@/features/posts/actions/get-post-by-id';

import { PostModal } from '@/features/posts/components/post/PostModal';

type Props = {
  params: Promise<{
    postId: string;
  }>;
};

export default async function PostModalPage({ params }: Props) {
  const { postId } = await params;
  const post = await getPostById(postId);

  if (!post) {
    notFound();
  }

  return <PostModal post={post} />;
}
