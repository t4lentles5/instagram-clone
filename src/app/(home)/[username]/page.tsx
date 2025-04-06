interface Props {
  params: Promise<{ username: string }>;
}

export default async function ProfileUserPage({ params }: Props) {
  const { username } = await params;

  console.log(username);

  return (
    <>
      <div className="grid w-full grid-cols-3 gap-1">
        <div className="aspect-3/4 bg-purple-500">1</div>
        <div className="aspect-3/4 bg-purple-500">1</div>
        <div className="aspect-3/4 bg-purple-500">1</div>
        <div className="aspect-3/4 bg-purple-500">1</div>
        <div className="aspect-3/4 bg-purple-500">1</div>
      </div>

      {/* <div className="flex h-full w-full flex-col items-center justify-center gap-5">
          <CameraIcon />
          <p className="mt-4 text-center text-3xl font-bold">
            {isOwnProfile ? 'Share Photos' : 'No posts yet!'}
          </p>
          {isOwnProfile && (
            <>
              <p className="text-sm font-normal">
                When you share photos, they will appear on your profile.
              </p>
              <button className="text-ig-blue text-sm font-normal">
                Share your first photo
              </button>
            </>
          )}
        </div> */}
    </>
  );
}
