interface Props {
  size: number;
}

export default function DownChevronIcon({ size }: Props) {
  return (
    <>
      <svg
        aria-label='Down chevron icon'
        className='rotate-180'
        fill='currentColor'
        height={size}
        role='img'
        viewBox='0 0 24 24'
        width={size}
      >
        <title>Down chevron icon</title>
        <path d='M21 17.502a.997.997 0 0 1-.707-.293L12 8.913l-8.293 8.296a1 1 0 1 1-1.414-1.414l9-9.004a1.03 1.03 0 0 1 1.414 0l9 9.004A1 1 0 0 1 21 17.502Z'></path>
      </svg>
    </>
  );
}
