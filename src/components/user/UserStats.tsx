export const UserStats = () => {
  return (
    <>
      <div className="border-border flex w-full items-center justify-evenly gap-10 border-b p-3 md:hidden">
        <p className="text-center font-bold">
          0<span className="block font-normal">posts</span>
        </p>
        <button className="font-bold">
          0 <span className="block font-normal">Followers</span>
        </button>
        <button className="font-bold">
          0 <span className="block font-normal">Following</span>
        </button>
      </div>
    </>
  );
};
