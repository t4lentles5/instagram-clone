interface Props {
  isActive: boolean;
}

export const SavedIcon = ({ isActive }: Props) => {
  return (
    <>
      <svg
        aria-label=""
        className={`${isActive ? 'text-primary' : 'text-secondary'} h-6 w-6 md:h-3 md:w-3`}
        fill="currentColor"
        height="12"
        role="img"
        viewBox="0 0 24 24"
        width="12"
      >
        <title></title>
        <polygon
          fill="none"
          points="20 21 12 13.44 4 21 4 3 20 3 20 21"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        ></polygon>
      </svg>
    </>
  );
};
