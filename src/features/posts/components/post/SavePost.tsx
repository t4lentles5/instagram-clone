import SaveIcon from '@/core/shared/icons/SaveIcon';

import { removeFromSavedPosts } from '@/features/posts/actions/remove-from-saved-posts';
import { savePost } from '@/features/posts/actions/save-post';
import { getAuthenticatedUser } from '@/features/auth/actions/get-authenticated-user';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { isSaved } from './is-saved';

interface Props {
  postId: string;
}

export const SavePost = ({ postId }: Props) => {
  const queryClient = useQueryClient();

  const { data: authenticatedUser } = useQuery({
    queryKey: ['authenticatedUser'],
    queryFn: () => getAuthenticatedUser(),
    staleTime: 1000 * 60 * 10,
  });

  const { data: isSavedData } = useQuery({
    queryKey: ['savedPosts', postId],
    queryFn: () => isSaved(postId, authenticatedUser!.id),
    enabled: !!authenticatedUser,
  });

  const toggleSave = async () => {
    if (!authenticatedUser) return;

    if (isSavedData) {
      await removeFromSavedPosts(postId, authenticatedUser.id);
    } else {
      await savePost(postId, authenticatedUser.id);
    }

    queryClient.invalidateQueries({ queryKey: ['savedPosts', postId] });
  };

  return (
    <button
      className='hover:text-ig-secondary-text active:text-ig-secondary-text-pressed cursor-pointer py-2 pl-2'
      onClick={toggleSave}
    >
      <SaveIcon isSaved={!!isSavedData} />
    </button>
  );
};
