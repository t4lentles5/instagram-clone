import { useEffect, useRef, useState } from 'react';

import { useUserStore } from '@/store/user/user-store';

import { NewPostMediaIcon } from '@/shared/icons';
import { BackPostIcon } from '@/posts/icons';
import { NewPostCarousel } from './NewPostCarousel';
import { SelectCrop } from './SelectCrop';
import { CropZoom } from './CropZoom';
import { MediaGallery } from './MediaGallery';
import { EditNewPost } from './EditNewPost';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export interface Filter {
  name: string;
  filterStyle: string;
}

export interface Adjustment {
  name: string;
  min: number;
  max: number;
  value: number;
}

const filters: Filter[] = [
  {
    name: 'Aden',
    filterStyle: 'brightness(120%) contrast(90%) sepia(40%)',
  },
  {
    name: 'Clarendon',
    filterStyle: 'brightness(125%) contrast(130%) saturate(150%)',
  },
  {
    name: 'Crema',
    filterStyle: 'brightness(110%) contrast(105%) sepia(30%)',
  },
  {
    name: 'Gingham',
    filterStyle: 'brightness(115%) contrast(90%) sepia(50%)',
  },
  {
    name: 'Juno',
    filterStyle: 'brightness(110%) contrast(125%) saturate(160%)',
  },
  {
    name: 'Lark',
    filterStyle: 'brightness(120%) contrast(105%) saturate(130%)',
  },
  {
    name: 'Ludwig',
    filterStyle: 'brightness(115%) contrast(100%) sepia(10%)',
  },
  {
    name: 'Moon',
    filterStyle: 'grayscale(100%) contrast(120%) brightness(105%)',
  },
  {
    name: 'Original',
    filterStyle: 'none',
  },
  {
    name: 'Perpetua',
    filterStyle: 'brightness(120%) saturate(130%)',
  },
  {
    name: 'Reyes',
    filterStyle: 'brightness(110%) contrast(90%) sepia(35%)',
  },
  {
    name: 'Slumber',
    filterStyle: 'brightness(115%) saturate(90%) sepia(40%)',
  },
];

const adjustments: Adjustment[] = [
  {
    name: 'Brightness',
    min: -100,
    max: 100,
    value: 0,
  },
  {
    name: 'Contrast',
    min: -100,
    max: 100,
    value: 0,
  },
  {
    name: 'Fade',
    min: -100,
    max: 100,
    value: 0,
  },
  {
    name: 'Saturation',
    min: -100,
    max: 100,
    value: 0,
  },
  {
    name: 'Temperature',
    min: -100,
    max: 100,
    value: 0,
  },
  {
    name: 'Vignette',
    min: 0,
    max: 100,
    value: 0,
  },
];

export const NewPostModal = ({ isOpen, onClose }: Props) => {
  const { userId } = useUserStore();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const dialogOptionsRef = useRef<HTMLDialogElement>(null);
  const [isOptionsDialogOpen, setIsOptionsDialogOpen] = useState(false);

  const [isCropOptionsOpen, setIsCropOptionsOpen] = useState(false);
  const [isZoomCropOpen, setIsZoomCropOpen] = useState(false);
  const [isMediaGalleryOpen, setIsMediaGalleryOpen] = useState(false);

  const [showEditPost, setShowEditPost] = useState(false);
  const [showFilters, setShowFilters] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState<Filter>(filters[8]);
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
    const dialogOptions = dialogOptionsRef.current;

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
    showEditPost,
    showFilters,
    selectedFilter,
    adjustmentValues,
    filterStrengths,
    selectedCrop,
    cropZoomValue,
  });

  return (
    <>
      <dialog
        ref={dialogRef}
        className={`${showEditPost ? 'w-[856px]' : 'w-[516px]'} bg-background-modal backdrop:bg-background-overlay fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-auto rounded-xl`}
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
        <div className='bg-background-modal flex flex-col rounded-lg'>
          {previewUrls.length > 0 ? (
            <>
              <header className='bg-background text-primary border-border flex w-full items-center rounded-t-lg border-b p-2 text-center font-semibold'>
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
                  className='ml-2 cursor-pointer'
                >
                  <BackPostIcon />
                </button>
                <div className='grow'>{showEditPost ? 'Edit' : 'Crop'}</div>
                <button
                  onClick={() => setShowEditPost(true)}
                  className='text-blue hover:text-blue-hover mr-2 cursor-pointer text-sm'
                >
                  Next
                </button>
              </header>

              <div className='flex'>
                <div className='relative aspect-square h-full w-[516px]'>
                  <NewPostCarousel
                    selectedFiles={selectedFiles}
                    selectedCrop={selectedCrop}
                    cropZoomValue={cropZoomValue}
                    selectedFilter={selectedFilter}
                    filterStrengths={filterStrengths}
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
                    filters={filters}
                    selectedFilter={selectedFilter}
                    setSelectedFilter={setSelectedFilter}
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
              <header className='bg-background text-primary border-border rounded-t-lg border-b p-2 text-center font-semibold'>
                Create new post
              </header>

              <div className='text-primary flex aspect-square h-full flex-col items-center justify-center p-6'>
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

      <dialog
        ref={dialogOptionsRef}
        onCancel={() => setIsOptionsDialogOpen(false)}
        className='bg-background-modal backdrop:bg-background-overlay fixed top-1/2 left-1/2 w-[400px] -translate-x-1/2 -translate-y-1/2 cursor-auto rounded-xl'
        aria-labelledby='discard-dialog-title'
        aria-describedby='discard-dialog-description'
      >
        <div className='flex flex-col items-center text-center'>
          <div className='p-6'>
            <h3 id='discard-dialog-title' className='text-primary mb-1 text-xl'>
              Discard post?
            </h3>
            <p
              id='discard-dialog-description'
              className='text-secondary text-sm'
            >
              If you leave, your edits won&apos;t be saved.
            </p>
          </div>

          <div className='border-border-popover flex w-full flex-col border-t'>
            <button
              className='h-12 w-full cursor-pointer px-2 py-1 text-sm font-bold text-red-500'
              onClick={() => {
                setIsOptionsDialogOpen(false);
                setPreviewUrls([]);
                setSelectedFiles([]);
                setSelectedFilter(filters[8]);
                setShowEditPost(false);
                setFilterStrengths(
                  filters.reduce(
                    (acc, filter) => {
                      acc[filter.name] = 100;
                      return acc;
                    },
                    {} as Record<string, number>,
                  ),
                );
                onClose();
              }}
            >
              Discard
            </button>

            <button
              className='text-primary border-border-popover h-12 w-full cursor-pointer border-t px-2 py-1 text-sm'
              onClick={() => setIsOptionsDialogOpen(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};
