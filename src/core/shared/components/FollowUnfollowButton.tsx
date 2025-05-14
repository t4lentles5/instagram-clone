import { useEffect, useState } from 'react';

import { DownChevronIcon } from '@/features/posts/icons';
import { unfollow } from '../actions/unfollow';
import { follow } from '../actions/follow';
import { isFollowingUser } from '@/features/profile/actions/is-following-user';

import { useUserStore } from '@/core/store/user/user-store';

interface Props {
  userId: string;
  inModal?: boolean;
}

export const FollowUnfollowButton = ({ userId, inModal }: Props) => {
  const [loading, setLoading] = useState(false);
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const { authenticatedUser } = useUserStore();

  useEffect(() => {
    const checkFollow = async () => {
      if (!authenticatedUser.id) return;
      const result = await isFollowingUser(authenticatedUser.id, userId);
      setIsFollowing(result);
    };

    checkFollow();
  }, [authenticatedUser.id, userId]);

  const handleFollow = async () => {
    if (loading) return;
    setLoading(true);
    try {
      await follow(userId);
      setIsFollowing(true);
    } finally {
      setLoading(false);
    }
  };

  const handleUnfollow = async () => {
    if (loading) return;
    setLoading(true);
    try {
      await unfollow(userId);
      setIsFollowing(false);
    } finally {
      setLoading(false);
    }
  };

  return isFollowing ? (
    <button
      className={`flex h-8 cursor-pointer items-center justify-center gap-1 rounded-lg text-sm font-semibold transition-colors duration-200 md:w-[118px] ${inModal ? 'bg-ig-secondary-modal-button-background hover:bg-ig-secondary-modal-button-background-hover active:bg-ig-secondary-modal-button-background-pressed w-[128px]' : 'bg-ig-secondary-button-background hover:bg-ig-secondary-button-background-hover active:bg-ig-secondary-button-background-pressed w-full'}`}
      onClick={handleUnfollow}
      disabled={loading}
    >
      <span>Following</span>
      <span>
        <DownChevronIcon size={12} />
      </span>
    </button>
  ) : (
    <button
      className={`bg-ig-primary-button hover:bg-ig-primary-button-hover active:bg-ig-primary-button-pressed text-web-always-white disabled:bg-ig-primary-button-disabled h-8 cursor-pointer rounded-lg text-sm font-semibold transition-colors duration-200 md:w-[82px] ${inModal ? 'w-[82px]' : 'w-full'}`}
      onClick={handleFollow}
      disabled={loading}
    >
      <span>Follow</span>
    </button>
  );
};
