import { notFound } from 'next/navigation';

import { getPostById } from '@/features/posts/actions/get-post-by-id';
import { getPostsByUsername } from '@/features/profile/actions/get-posts-by-username';

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

  const posts = await getPostsByUsername(post.author.username);

  return (
    <div className='mt-2 grid place-content-center'>
      {posts.map((post) => (
        <h1 key={post.id}>{post.id}</h1>
      ))}
      {postId}
    </div>
  );
}
