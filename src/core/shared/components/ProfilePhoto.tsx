interface Props {
  profile_photo: string | null;
  imageSize: {
    size: string;
    mdSize?: string;
  };
  backgroundDivSize: {
    size: string;
    mdSize?: string;
  };
  borderDivSize: {
    size: string;
    mdSize?: string;
  };
}

export const ProfilePhoto = ({
  profile_photo,
  imageSize,
  backgroundDivSize,
  borderDivSize,
}: Props) => {
  return (
    <div className='relative'>
      <div
        className={`absolute -top-1 -left-1 aspect-square rounded-full bg-gradient-to-tr from-amber-400 via-rose-500 to-fuchsia-600 p-0.5 ${borderDivSize.size} ${borderDivSize.mdSize}`}
      >
        <div
          className={`bg-ig-primary-background aspect-square rounded-full p-0.5 ${backgroundDivSize.size} ${backgroundDivSize.mdSize}`}
        />
      </div>

      <img
        src={profile_photo || '/default_photo.jpg'}
        alt='Profile photo'
        className={`relative z-0 aspect-square cursor-pointer rounded-full ${imageSize.size} ${imageSize.mdSize}`}
      />
    </div>
  );
};
