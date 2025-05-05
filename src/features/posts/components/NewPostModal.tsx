import { useEffect, useRef, useState } from 'react';

import { useUserStore } from '@/core/store/user/user-store';
import { useImageFilters } from '@/features/posts/hooks/useImageFilters';

import { NewPostCarousel } from '@/features/posts/components/NewPostCarousel';
import { SelectCrop } from '@/features/posts/components/SelectCrop';
import { CropZoom } from '@/features/posts/components/CropZoom';
import { MediaGallery } from '@/features/posts/components/MediaGallery';
import { EditNewPost } from '@/features/posts/components/EditNewPost';
import { CloseModalOptions } from '@/features/posts/components/CloseModalOptions';

import { filters } from '@/features/posts/utils/filters';
import { Adjustment, adjustments } from '@/features/posts/utils/adjustments';

import { NewPostMediaIcon } from '@/core/shared/icons';
import { BackPostIcon } from '@/features/posts/icons';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const NewPostModal = ({ isOpen, onClose }: Props) => {
  const { userId } = useUserStore();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    selectedFiles,
    setSelectedFiles,
    previewUrls,
    setPreviewUrls,
    selectedFilters,
    setFilterAt,
    clearAll,
  } = useImageFilters();

  const closeModalOptionsRef = useRef<HTMLDialogElement>(null);
  const [isOptionsDialogOpen, setIsOptionsDialogOpen] = useState(false);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isCropOptionsOpen, setIsCropOptionsOpen] = useState(false);
  const [isZoomCropOpen, setIsZoomCropOpen] = useState(false);
  const [isMediaGalleryOpen, setIsMediaGalleryOpen] = useState(false);

  const [showEditPost, setShowEditPost] = useState(false);
  const [showFilters, setShowFilters] = useState(true);
  const [adjustmentValues, setAdjustmentValues] =
    useState<Adjustment[]>(adjustments);
  const [filterStrengths, setFilterStrengths] = useState<
    Record<string, number>
  >(() =>
    filters.reduce(
      (acc, filter) => {
        acc[filter.name] = 100;
        return acc;
      },
      {} as Record<string, number>,
    ),
  );

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
    if (isOpen) {
      const originalStyles = {
        overflow: document.body.style.overflow,
        paddingRight: document.body.style.paddingRight,
        position: document.body.style.position,
        top: document.body.style.top,
        width: document.body.style.width,
      };

      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;

      const scrollY = window.scrollY;

      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollbarWidth}px`;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';

      return () => {
        document.body.style.overflow = originalStyles.overflow;
        document.body.style.paddingRight = originalStyles.paddingRight;
        document.body.style.position = originalStyles.position;
        document.body.style.top = originalStyles.top;
        document.body.style.width = originalStyles.width;

        window.scrollTo(0, scrollY);
      };
    }
  }, [isOpen]);

  useEffect(() => {
    const dialog = dialogRef.current;
    const dialogOptions = closeModalOptionsRef.current;

    if (!dialog) return;

    if (isOpen && !dialog.open) {
      dialog.showModal();
    }

    if (!isOpen && dialog.open && !isOptionsDialogOpen) {
      dialog.close();
    }

    if (isOptionsDialogOpen && dialogOptions && !dialogOptions.open) {
      dialogOptions.showModal();
    }

    if (!isOptionsDialogOpen && dialogOptions?.open) {
      dialogOptions.close();
    }
  }, [isOpen, isOptionsDialogOpen]);

  const handleCloseAttempt = (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (previewUrls.length === 0) {
      onClose();
    } else {
      setIsOptionsDialogOpen(true);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen && !isOptionsDialogOpen) {
        e.preventDefault();
        if (previewUrls.length === 0) {
          onClose();
        } else {
          setIsOptionsDialogOpen(true);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isOptionsDialogOpen, previewUrls]);

  console.log({
    selectedFiles,
    previewUrls,
    selectedFilters,
    adjustmentValues,
    filterStrengths,
    selectedCrop,
    cropZoomValue,
  });

  return (
    <>
      <dialog
        ref={dialogRef}
        className={`${showEditPost ? 'w-[856px]' : 'w-[516px]'} bg-ig-elevated-background backdrop:bg-overlay-alpha-80 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-auto rounded-xl`}
        onCancel={handleCloseAttempt}
        onClick={(e) => {
          const dialog = dialogRef.current;
          e.stopPropagation();
          if (dialog && e.target === dialog) {
            if (previewUrls.length === 0) {
              onClose();
            } else {
              setIsOptionsDialogOpen(true);
            }
          }
          if (isCropOptionsOpen) setIsCropOptionsOpen(false);
          if (isZoomCropOpen) setIsZoomCropOpen(false);
          if (isMediaGalleryOpen) setIsMediaGalleryOpen(false);
        }}
      >
        <div className='flex flex-col rounded-lg'>
          {previewUrls.length > 0 ? (
            <>
              <header className='bg-ig-primary-background text-ig-primary-text border-ig-elevated-separator flex w-full items-center rounded-t-lg border-b p-2 text-center font-semibold'>
                <button
                  onClick={() => {
                    if (showEditPost) {
                      setShowEditPost(false);
                    } else {
                      if (previewUrls.length > 0) {
                        setIsOptionsDialogOpen(true);
                      } else {
                        onClose();
                      }
                    }
                  }}
                  className='active:text-ig-primary-text-pressed ml-2 cursor-pointer'
                >
                  <BackPostIcon />
                </button>
                <div className='grow'>{showEditPost ? 'Edit' : 'Crop'}</div>
                <button
                  onClick={() => setShowEditPost(true)}
                  className='text-ig-primary-button hover:text-ig-link active:text-ig-primary-button-pressed mr-2 cursor-pointer text-sm'
                >
                  Next
                </button>
              </header>

              <div className='bg-ig-secondary-background flex'>
                <div className='relative aspect-square h-full w-[516px]'>
                  <NewPostCarousel
                    selectedFiles={selectedFiles}
                    selectedCrop={selectedCrop}
                    cropZoomValue={cropZoomValue}
                    selectedFilter={selectedFilters[currentImageIndex]}
                    filterStrengths={filterStrengths}
                    currentImageIndex={currentImageIndex}
                    setCurrentImageIndex={setCurrentImageIndex}
                  />

                  {!showEditPost && (
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
                  )}
                </div>

                {showEditPost && (
                  <EditNewPost
                    showFilters={showFilters}
                    setShowFilters={setShowFilters}
                    currentImageIndex={currentImageIndex}
                    filters={filters}
                    setFilterAt={setFilterAt}
                    selectedFilters={selectedFilters}
                    filterStrengths={filterStrengths}
                    setFilterStrengths={setFilterStrengths}
                    adjustmentValues={adjustmentValues}
                    setAdjustmentValues={setAdjustmentValues}
                  />
                )}
              </div>
            </>
          ) : (
            <>
              <header className='bg-ig-primary-background text-ig-primary-text border-ig-elevated-separator rounded-t-lg border-b p-2 text-center font-semibold'>
                Create new post
              </header>

              <div className='text-ig-primary-text flex aspect-square h-full flex-col items-center justify-center p-6'>
                <NewPostMediaIcon />
                <p className='mt-3 text-xl'>Drag photos and videos here</p>
                <button
                  className='hover:bg-button-hover bg-ig-primary-button hover:bg-ig-primary-button-hover active:bg-ig-primary-button-pressed text-web-always-white mt-5 cursor-pointer rounded-lg px-4 py-[7px] text-sm font-semibold'
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

      <CloseModalOptions
        closeModalOptionsRef={closeModalOptionsRef}
        setIsOptionsDialogOpen={setIsOptionsDialogOpen}
        setShowEditPost={setShowEditPost}
        setFilterStrengths={setFilterStrengths}
        onClose={onClose}
        clearAll={clearAll}
      />
    </>
  );
};
