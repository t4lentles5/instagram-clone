import { getAuthenticatedUser } from '@/actions/auth/get-authenticate-user';
import { getRecommendedUsers } from '@/actions/user/get-recommended-users';
import { Footer } from '@/components/ui/Footer';
import Link from 'next/link';

export default async function HomePage() {
  const user = await getAuthenticatedUser();
  const users = await getRecommendedUsers(user.id);

  return (
    <div className='flex justify-center w-full h-full pt-6'>
      <div className='w-[630px] bg-purple-500'>
        <div className='w-full'>uwu</div>
        <div></div>
      </div>

      <div className='hidden w-[340px] pl-16 pt-5 lg:block'>
        <div className='flex justify-between mb-5'>
          <div className='flex gap-3'>
            <img
              src={
                !user.profile_photo
                  ? '/default_photo.jpg'
                  : `${user.profile_photo}`
              }
              alt='profile photo'
              className='object-contain border rounded-full w-11 h-11 border-separation'
            />

            <div className='flex flex-col'>
              <Link
                href={`/${user.username}`}
                className='text-sm font-semibold'
              >
                {user.username}
              </Link>
              <span className='text-sm text-foregroundSecondary'>
                {user.fullname}
              </span>
            </div>
          </div>

          <button className='text-xs text-buttonColor'>Switch</button>
        </div>
        <div className='flex items-center justify-between mb-3'>
          <span className='text-sm font-semibold text-foregroundSecondary'>
            Suggested for you
          </span>
          <Link href={'/explore/people'} className='text-xs font-semibold'>
            See All
          </Link>
        </div>

        <div className='flex flex-col gap-4'>
          {users.map((user) => (
            <div key={user.id} className='flex justify-between'>
              <div className='flex gap-3'>
                <img
                  src={
                    !user.profile_photo
                      ? '/default_photo.jpg'
                      : `${user.profile_photo}`
                  }
                  alt='profile photo'
                  className='object-contain border rounded-full w-11 h-11 border-separation'
                />

                <div className='flex flex-col'>
                  <Link
                    href={`/${user.username}`}
                    className='text-sm font-semibold'
                  >
                    {user.username}
                  </Link>
                  <span className='text-xs text-foregroundSecondary'>
                    Suggested for you
                  </span>
                </div>
              </div>

              <button className='text-xs text-buttonColor'>Follow</button>
            </div>
          ))}
        </div>
        <Footer />
      </div>
    </div>
  );
}
