import { notFound } from 'next/navigation';

import { getPostById } from '@/actions/post/get-post-by-id';

import { PostModal } from '@/posts/components/PostModal';

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
