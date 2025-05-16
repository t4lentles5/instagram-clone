import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { dislikeComment } from '@/features/posts/actions/dislike-comment';
import { likeComment } from '@/features/posts/actions/like-comment';
import { getAuthenticatedUser } from '@/features/auth/actions/get-authenticated-user';

import { Comment, Reply } from '@/core/shared/interfaces/post.interface';

import { HeartIcon } from '@/core/shared/icons';
import styles from '@/features/posts/components/likes/like-animation.module.css';

interface Props {
  comment: Comment | Reply;
}

export const LikeCommentButton = ({ comment }: Props) => {
  const { data: authenticatedUser } = useQuery({
    queryKey: ['authenticatedUser'],
    queryFn: () => getAuthenticatedUser(),
    staleTime: 1000 * 60 * 10,
  });

  const hasLiked = comment.commentLike.some(
    (like) => like.userId === authenticatedUser!.id,
  );
  const like = comment.commentLike.find(
    (like) => like.userId === authenticatedUser!.id,
  );

  const toggleLike = () => {
    if (hasLiked) {
      dislikeComment(like!.id, comment.postId);
    } else {
      likeComment(authenticatedUser!.id, comment.id, comment.postId);
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
