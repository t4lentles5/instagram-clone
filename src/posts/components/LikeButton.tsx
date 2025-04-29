import { dislikePost } from '@/actions/post/dislike-post';
import { likePost } from '@/actions/post/like-post';

import { Post } from '@/interfaces/post.interface';

import { HeartIcon } from '@/shared/icons';

interface Props {
  post: Post;
  userId: string;
}

export const LikeButton = ({ post, userId }: Props) => {
  const hasLiked = post.likes.some((like) => like.userId === userId);
  const like = post.likes.find((like) => like.userId === userId);

  const toggleLike = () => {
    if (hasLiked) {
      dislikePost(like!.id);
    } else {
      likePost(post.id, userId);
    }
  };

  return (
    <>
      <button className='cursor-pointer py-2 pr-2' onClick={() => toggleLike()}>
        <HeartIcon type={'like'} size={24} hasLiked={hasLiked} />
      </button>
    </>
  );
};
