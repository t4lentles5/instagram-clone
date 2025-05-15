import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { unfollow } from '../actions/unfollow';
import { follow } from '../actions/follow';
import { isFollowingUser } from '@/features/profile/actions/is-following-user';
import { useUserStore } from '@/core/store/user/user-store';

import { DownChevronIcon } from '@/features/posts/icons';

interface Props {
  userId: string;
  inModal?: boolean;
}

export const FollowUnfollowButton = ({ userId, inModal }: Props) => {
  const { authenticatedUser } = useUserStore();

  const queryClient = useQueryClient();

  const { data: isFollowing, isLoading } = useQuery({
    queryKey: ['isFollowing', authenticatedUser.id, userId],
    queryFn: () => isFollowingUser(authenticatedUser.id, userId),
    enabled: !!authenticatedUser.id,
  });

  const followMutation = useMutation({
    mutationFn: () => follow(userId),
    onSuccess: () => {
      queryClient.setQueryData(
        ['isFollowing', authenticatedUser.id, userId],
        true,
      );
    },
  });

  const unfollowMutation = useMutation({
    mutationFn: () => unfollow(userId),
    onSuccess: () => {
      queryClient.setQueryData(
        ['isFollowing', authenticatedUser.id, userId],
        false,
      );
    },
  });

  if (isLoading) return <></>;

  return isFollowing ? (
    <button
      className={`flex h-8 cursor-pointer items-center justify-center gap-1 rounded-lg text-sm font-semibold transition-colors duration-200 md:w-[118px] ${
        inModal
          ? 'bg-ig-secondary-modal-button-background hover:bg-ig-secondary-modal-button-background-hover active:bg-ig-secondary-modal-button-background-pressed w-[128px]'
          : 'bg-ig-secondary-button-background hover:bg-ig-secondary-button-background-hover active:bg-ig-secondary-button-background-pressed w-full'
      }`}
      onClick={() => unfollowMutation.mutate()}
      disabled={unfollowMutation.isPending}
    >
      <span>Following</span>
      <DownChevronIcon size={12} />
    </button>
  ) : (
    <button
      className={`bg-ig-primary-button hover:bg-ig-primary-button-hover active:bg-ig-primary-button-pressed text-web-always-white disabled:bg-ig-primary-button-disabled h-8 cursor-pointer rounded-lg text-sm font-semibold transition-colors duration-200 md:w-[82px] ${
        inModal ? 'w-[82px]' : 'w-full'
      }`}
      onClick={() => followMutation.mutate()}
      disabled={followMutation.isPending}
    >
      <span>Follow</span>
    </button>
  );
};
