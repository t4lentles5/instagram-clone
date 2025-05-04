interface Props {
  type: 'comment' | 'comments';
  size: number;
}

export default function CommentIcon({ type, size }: Props) {
  return (
    <>
      <svg
        aria-label={type === 'comment' ? 'Comment' : 'Comments'}
        fill='currentColor'
        height={`${size}`}
        role='img'
        viewBox='0 0 24 24'
        width={`${size}`}
      >
        {type === 'comment' && <title>Comment</title>}
        <path
          d='M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z'
          fill={type === 'comment' ? 'none' : 'currentColor'}
          stroke='currentColor'
          strokeLinejoin='round'
          strokeWidth='2'
        />
      </svg>
    </>
  );
}
