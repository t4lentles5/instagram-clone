import { useState } from 'react';

import { dislikeComment } from '@/actions/post/comment/dislike-comment';
import { likeComment } from '@/actions/post/comment/like-comment';

import { HeartIcon } from '@/shared/icons';

import { Comment, Reply } from '@/interfaces/post.interface';

import { useUserStore } from '@/store/user/user-store';
import styles from './like-animation.module.css';

interface Props {
  comment: Comment | Reply;
}

export const LikeCommentButton = ({ comment }: Props) => {
  const { userId } = useUserStore();

  const hasLiked = comment.commentLike.some((like) => like.userId === userId);
  const like = comment.commentLike.find((like) => like.userId === userId);

  const toggleLike = () => {
    if (hasLiked) {
      dislikeComment(like!.id, comment.postId);
    } else {
      likeComment(userId, comment.id, comment.postId);
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
        className={`${isPopping && styles['animate-pop']} mt-[9px] w-[24px] flex-shrink-0 cursor-pointer`}
        onClick={handleLike}
      >
        <HeartIcon type={'like'} size={12} hasLiked={hasLiked} />
      </button>
    </>
  );
};
