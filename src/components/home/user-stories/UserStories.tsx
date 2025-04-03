import { User } from '@/interfaces/user.interface';
import Link from 'next/link';

interface Props {
  users: User[];
}

export const UserStories = ({ users }: Props) => {
  return (
    <>
      <div className="mb-6 flex w-full gap-[10px] py-2">
        {users.map((user) => (
          <Link
            href={`/stories/${user.username}`}
            key={user.id}
            className="flex flex-col items-center justify-center"
          >
            <div className="px-1 pb-1">
              <div className="rounded-full bg-linear-to-tr from-amber-400 via-rose-500 to-fuchsia-600 p-0.5">
                <div className="bg-background rounded-full p-0.5">
                  <img
                    src={user.profile_photo}
                    alt="Foto de perfil"
                    className="h-14 w-14 rounded-full object-cover"
                  />
                </div>
              </div>
            </div>

            <span className="text-foreground max-w-14 truncate overflow-hidden text-xs">
              {user.username}
            </span>
          </Link>
        ))}
      </div>
    </>
  );
};
