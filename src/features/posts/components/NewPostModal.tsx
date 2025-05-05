import { useEffect, useState } from 'react';

import { useUserStore } from '@/core/store/user/user-store';
import { useEditPost } from '@/features/posts/hooks/useEditPost';
import { useNewPostModal } from '@/features/posts/hooks/useNewPostModal';

import { NewPostCarousel } from '@/features/posts/components/NewPostCarousel';
import { SelectCrop } from '@/features/posts/components/SelectCrop';
import { CropZoom } from '@/features/posts/components/CropZoom';
import { MediaGallery } from '@/features/posts/components/MediaGallery';
import { EditNewPost } from '@/features/posts/components/EditNewPost';
import { CloseModalOptions } from '@/features/posts/components/CloseModalOptions';

import { filters } from '@/features/posts/utils/filters';

import { NewPostMediaIcon } from '@/core/shared/icons';
import { BackPostIcon } from '@/features/posts/icons';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const NewPostModal = ({ isOpen, onClose }: Props) => {
  const { userId } = useUserStore();
  const {
    newPostModalRef,
    modalOptionsRef,
    fileInputRef,
    isModalOptionsOpen,
    setIsModalOptionsOpen,
  } = useNewPostModal();

  const {
    selectedFiles,
    setSelectedFiles,
    previewUrls,
    showEditPost,
    setShowEditPost,
    showFilters,
    setShowFilters,
    isCropOptionsOpen,
    setIsCropOptionsOpen,
    isZoomCropOpen,
    setIsZoomCropOpen,
    isMediaGalleryOpen,
    setIsMediaGalleryOpen,
    selectedCrop,
    setSelectedCrop,
    cropZoomValue,
    setCropZoomValue,
    selectedFilters,
    setFilterAt,
    filterStrengths,
    setFilterStrengths,
    adjustmentValues,
    setAdjustmentValues,
    resetStates,
  } = useEditPost();

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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

  const handleCloseAttempt = (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (previewUrls.length === 0) {
      onClose();
    } else {
      setIsModalOptionsOpen(true);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen && !isModalOptionsOpen) {
        e.preventDefault();
        if (previewUrls.length === 0) {
          onClose();
        } else {
          setIsModalOptionsOpen(true);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isModalOptionsOpen, previewUrls]);

  useEffect(() => {
    const dialog = newPostModalRef.current;
    const dialogOptions = modalOptionsRef.current;

    if (!dialog) return;

    if (isOpen && !dialog.open) {
      dialog.showModal();
    }

    if (!isOpen && dialog.open && !isModalOptionsOpen) {
      dialog.close();
    }

    if (isModalOptionsOpen && dialogOptions && !dialogOptions.open) {
      dialogOptions.showModal();
    }

    if (!isModalOptionsOpen && dialogOptions?.open) {
      dialogOptions.close();
    }
  }, [isOpen, isModalOptionsOpen]);

  console.log({
    selectedFiles,
    previewUrls,
    showEditPost,
    showFilters,
    selectedCrop,
    cropZoomValue,
    selectedFilters,
    filterStrengths,
    adjustmentValues,
  });

  return (
    <>
      <dialog
        ref={newPostModalRef}
        className={`${showEditPost ? 'w-[856px]' : 'w-[516px]'} bg-ig-elevated-background backdrop:bg-overlay-alpha-80 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-auto rounded-xl`}
        onCancel={handleCloseAttempt}
        onClick={(e) => {
          const dialog = newPostModalRef.current;
          e.stopPropagation();
          if (dialog && e.target === dialog) {
            if (previewUrls.length === 0) {
              onClose();
            } else {
              setIsModalOptionsOpen(true);
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
                        setIsModalOptionsOpen(true);
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
        modalOptionsRef={modalOptionsRef}
        setIsModalOptionsOpen={setIsModalOptionsOpen}
        setShowEditPost={setShowEditPost}
        setFilterStrengths={setFilterStrengths}
        onClose={onClose}
        resetStates={resetStates}
      />
    </>
  );
};
