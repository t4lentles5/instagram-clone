import { useState } from 'react';

import { dislikePost } from '@/features/posts/actions/dislike-post';
import { likePost } from '@/features/posts/actions/like-post';

import { Post } from '@/core/shared/interfaces/post.interface';

import { HeartIcon } from '@/core/shared/icons';

import styles from '@/features/posts/components/likes/like-animation.module.css';

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

  const [isPopping, setIsPopping] = useState(false);
  const [hasLikedLocal, setHasLikedLocal] = useState(hasLiked);

  const handleLike = () => {
    if (!hasLikedLocal) {
      setIsPopping(true);
      setTimeout(() => setIsPopping(false), 300);
    }

    setHasLikedLocal((prev) => !prev);
    toggleLike();
  };

  return (
    <>
      <button
        className={`hover:text-ig-secondary-text active:text-ig-secondary-text-pressed cursor-pointer py-2 pr-2 ${isPopping && styles['animate-pop']}`}
        onClick={handleLike}
      >
        <HeartIcon type='like' size={24} hasLiked={hasLiked} />
      </button>
    </>
  );
};
