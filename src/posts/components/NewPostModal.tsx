import { useEffect, useRef, useState } from 'react';

import { useUserStore } from '@/store/user/user-store';

import { NewPostMediaIcon } from '@/shared/icons';
import { BackPostIcon } from '@/posts/icons';
import { NewPostCarousel } from './NewPostCarousel';
import { SelectCrop } from './SelectCrop';
import { CropZoom } from './CropZoom';
import { MediaGallery } from './MediaGallery';

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

  const [selectedCrop, setSelectedCrop] = useState<
    'original' | 'square' | 'portrait' | 'video'
  >('square');
  const [cropZoomValue, setCropZoomValue] = useState(0);

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
                <NewPostCarousel
                  selectedFiles={selectedFiles}
                  selectedCrop={selectedCrop}
                />
                <div className='absolute bottom-0 flex w-full justify-between p-4'>
                  <div className='flex gap-3'>
                    <SelectCrop
                      isCropOptionsOpen={isCropOptionsOpen}
                      setIsCropOptionsOpen={setIsCropOptionsOpen}
                      selectedCrop={selectedCrop}
                      setSelectedCrop={setSelectedCrop}
                    />

                    <CropZoom
                      isZoomCropOpen={isZoomCropOpen}
                      setIsZoomCropOpen={setIsZoomCropOpen}
                      cropZoomValue={cropZoomValue}
                      setCropZoomValue={setCropZoomValue}
                    />
                  </div>

                  <MediaGallery
                    isMediaGalleryOpen={isMediaGalleryOpen}
                    setIsMediaGalleryOpen={setIsMediaGalleryOpen}
                    selectedFiles={selectedFiles}
                  />
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
