import { notFound } from 'next/navigation';

import { getPostById } from '@/actions/post/get-post-by-id';
import { getPostsByUsername } from '@/actions/user/get-posts-by-username';

import { PostModal } from '@/features/profile/post/components/PostModal';

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

  const posts = await getPostsByUsername(post.author.username);

  return <PostModal currentPostId={post.id} posts={posts} />;
}
