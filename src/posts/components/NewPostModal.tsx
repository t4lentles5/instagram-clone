import { useEffect, useRef, useState } from 'react';

import { useUserStore } from '@/store/user/user-store';

import { NewPostMediaIcon } from '@/shared/icons';
import {
  BackPostIcon,
  CropLandscapeIcon,
  CropPortraitIcon,
  CropSquareIcon,
  OpenMediaGalleryIcon,
  PhotoOutlineIcon,
  SelectCropIcon,
  SelectZoomIcon,
} from '@/posts/icons';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const NewPostModal = ({ isOpen, onClose }: Props) => {
  const { userId } = useUserStore();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isCropOptionsOpen, setIsCropOptionsOpen] = useState(false);
  const [isZoomCropOpen, setIsZoomCropOpen] = useState(false);
  const [isMediaGalleryOpen, setIsMediaGalleryOpen] = useState(false);

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  useEffect(() => {
    if (selectedFiles.length > 0) {
      const urls = selectedFiles.map((file) => URL.createObjectURL(file));
      setPreviewUrls(urls);

      return () => {
        urls.forEach((url) => URL.revokeObjectURL(url));
      };
    }
  }, [selectedFiles]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const maxFiles = 10;
    const filesArray = Array.from(files).slice(0, maxFiles);

    try {
      const formData = new FormData();
      filesArray.forEach((file) => {
        formData.append('images', file);
      });

      formData.append('userId', userId);

      setSelectedFiles(filesArray);
      e.target.value = '';

      const res = await fetch('/api/posts/create-post', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        throw new Error('Failed to upload images');
      }
    } catch (error) {
      console.error('Error al preparar la subida de imágenes:', error);
    }
  };

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      if (!dialog.open) {
        dialog.showModal();
      }
    } else {
      if (dialog.open) {
        dialog.close();
      }
    }
  }, [isOpen]);

  return (
    <>
      <dialog
        ref={dialogRef}
        className='bg-popover backdrop:bg-background-overlay fixed top-1/2 left-1/2 w-[516px] -translate-x-1/2 -translate-y-1/2 cursor-auto rounded-xl'
        onCancel={onClose}
        onClick={(e) => {
          const dialog = dialogRef.current;
          e.stopPropagation();
          if (dialog && e.target === dialog) onClose();
          if (isCropOptionsOpen) setIsCropOptionsOpen(false);
          if (isZoomCropOpen) setIsZoomCropOpen(false);
          if (isMediaGalleryOpen) setIsMediaGalleryOpen(false);
        }}
      >
        <div className='bg-popover flex flex-col rounded-lg'>
          {previewUrls.length > 0 ? (
            <>
              <header className='bg-background text-primary border-border flex w-full items-center rounded-t-lg border-b p-2 text-center font-semibold'>
                <div className='ml-2 cursor-pointer'>
                  <BackPostIcon />
                </div>
                <div className='grow'>Crop</div>
                <div className='text-blue hover:text-blue-hover mr-2 cursor-pointer text-sm'>
                  Next
                </div>
              </header>

              <div className='relative aspect-square h-full w-full'>
                <img
                  src={URL.createObjectURL(selectedFiles[0])}
                  alt='Selected Image'
                  className='h-full w-full object-cover'
                />
                <div className='absolute bottom-0 flex w-full justify-between p-4'>
                  <div className='flex gap-3'>
                    <div>
                      <button
                        className={`${isCropOptionsOpen ? 'bg-white text-black hover:bg-white/80' : 'bg-background-overlay hover:bg-background-overlay/80 text-white'} relative cursor-pointer rounded-full p-2 transition-colors duration-200`}
                        onClick={() => setIsCropOptionsOpen(!isCropOptionsOpen)}
                      >
                        <SelectCropIcon />
                      </button>
                      {isCropOptionsOpen && (
                        <div
                          className={`${isCropOptionsOpen ? '' : ''} bg-background-overlay divide-border absolute bottom-16 divide-y rounded-lg text-white`}
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                        >
                          <div>
                            <button className='ml-3 flex cursor-pointer items-center justify-center px-1 text-sm font-semibold'>
                              Original{' '}
                              <span className='p-3'>
                                <PhotoOutlineIcon />
                              </span>
                            </button>
                          </div>

                          <div>
                            <button className='ml-3 flex cursor-pointer items-center justify-center px-1 text-sm font-semibold'>
                              1:1{' '}
                              <span className='p-3'>
                                <CropSquareIcon />
                              </span>
                            </button>
                          </div>

                          <div>
                            <button className='ml-3 flex cursor-pointer items-center justify-center px-1 text-sm font-semibold'>
                              4:5{' '}
                              <span className='p-3'>
                                <CropPortraitIcon />
                              </span>
                            </button>
                          </div>

                          <div>
                            <button className='ml-3 flex cursor-pointer items-center justify-center px-1 text-sm font-semibold'>
                              16:9{' '}
                              <span className='p-3'>
                                <CropLandscapeIcon />
                              </span>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>

                    <div>
                      <button
                        className={`${isZoomCropOpen ? 'bg-white text-black hover:bg-white/80' : 'bg-background-overlay hover:bg-background-overlay/80 text-white'} relative cursor-pointer rounded-full p-2 transition-colors duration-200`}
                        onClick={() => setIsZoomCropOpen(!isZoomCropOpen)}
                      >
                        <SelectZoomIcon />
                      </button>
                      {isZoomCropOpen && (
                        <div
                          className='bg-background-overlay absolute bottom-16 flex h-8 w-[132px] items-center rounded-lg px-3'
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                        >
                          <input
                            type='range'
                            min={0}
                            max={100}
                            defaultValue={0}
                            className='h-[2px] w-full appearance-none rounded-lg bg-black [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-none [&::-webkit-slider-thumb]:bg-white'
                          />
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    <button
                      className={`${isMediaGalleryOpen ? 'bg-white text-black hover:bg-white/80' : 'bg-background-overlay hover:bg-background-overlay/80 text-white'} relative cursor-pointer rounded-full p-2 transition-colors duration-200`}
                      onClick={() => setIsMediaGalleryOpen(!isMediaGalleryOpen)}
                    >
                      <OpenMediaGalleryIcon />
                    </button>
                    {isMediaGalleryOpen && (
                      <div
                        className='absolute bottom-16'
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      >
                        <span>gallery</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <header className='bg-background text-primary border-border w-full rounded-t-lg border-b p-2 text-center font-semibold'>
                Create new post
              </header>

              <div className='text-primary flex aspect-square h-full w-full flex-col items-center justify-center p-6'>
                <NewPostMediaIcon />
                <p className='mt-3 text-xl'>Drag photos and videos here</p>
                <button
                  className='hover:bg-button-hover bg-button mt-5 cursor-pointer rounded-lg px-4 py-[7px] text-sm font-semibold text-white'
                  onClick={() => {
                    fileInputRef.current?.click();
                  }}
                >
                  Select from computer
                </button>
              </div>
            </>
          )}
        </div>
      </dialog>

      <input
        ref={fileInputRef}
        multiple
        type='file'
        accept='image/*'
        className='hidden'
        onChange={handleUpload}
      />
    </>
  );
};
