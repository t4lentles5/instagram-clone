import { dislikeComment } from '@/actions/post/comment/dislike-comment';
import { likeComment } from '@/actions/post/comment/like-comment';
import { HeartIcon } from '@/components/icons/HeartIcon';
import { Comment } from '@/interfaces/post.interface';

interface Props {
  comment: Comment;
  userId: string;
}

export const LikeCommentButton = ({ comment, userId }: Props) => {
  const hasLiked = comment.commentLike.some((like) => like.userId === userId);
  const like = comment.commentLike.find((like) => like.userId === userId);

  const toggleLike = () => {
    if (hasLiked) {
      dislikeComment(like!.id, comment.postId);
    } else {
      likeComment(userId, comment.id, comment.postId);
    }
  };

  return (
    <>
      <button
        className='mt-[9px] w-[24px] flex-shrink-0 cursor-pointer'
        onClick={() => toggleLike()}
      >
        <HeartIcon type={'like'} size={12} hasLiked={hasLiked} />
      </button>
    </>
  );
};
