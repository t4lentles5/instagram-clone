import { Dispatch, RefObject, SetStateAction } from 'react';

interface Props {
  setOpen: Dispatch<SetStateAction<boolean>>;
  handleRemovePhoto: () => Promise<void>;
  fileInputRef: RefObject<HTMLInputElement | null>;
}

export const PhotoOptionsModal = ({
  setOpen,
  handleRemovePhoto,
  fileInputRef,
}: Props) => {
  return (
    <>
      <div
        className="bg-background-overlay fixed inset-0 z-50 flex cursor-default items-center justify-center"
        onClick={() => setOpen(false)}
      >
        <div
          className="bg-popover w-[400px] rounded-xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="m-8">
            <h3 className="text-center text-xl leading-3.5">
              Change Profile Photo
            </h3>
          </div>

          <div className="mt-4 w-full">
            <button
              className="border-border-popover text-blue h-12 w-full cursor-pointer border-t px-2 py-1 text-[14px] font-bold"
              onClick={() => {
                setOpen(false);
                fileInputRef.current?.click();
              }}
            >
              Upload Photo
            </button>

            <button
              className="border-border-popover text-red h-12 w-full cursor-pointer border-t px-2 py-1 text-[14px] font-bold"
              onClick={handleRemovePhoto}
            >
              Remove Current Photo
            </button>
            <button
              className="border-border-popover h-12 w-full cursor-pointer border-t px-2 py-1 text-[14px]"
              onClick={() => setOpen(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
