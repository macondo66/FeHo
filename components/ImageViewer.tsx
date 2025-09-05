
import React from 'react';
import type { EditedImageResult } from '../types';
import { Loader } from './Loader';

interface ImageViewerProps {
  originalImageUrl: string;
  editedImageResult: EditedImageResult | null;
  isLoading: boolean;
}

const ImageCard: React.FC<{ title: string; imageUrl?: string; children?: React.ReactNode; isLoading?: boolean }> = ({ title, imageUrl, children, isLoading = false }) => (
    <div className="flex-1 flex flex-col items-center gap-3 w-full">
        <h3 className="text-lg font-semibold text-gray-400">{title}</h3>
        <div className="relative w-full aspect-square bg-gray-850 rounded-xl shadow-lg overflow-hidden flex items-center justify-center">
            {isLoading && (
                 <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
                    <Loader />
                </div>
            )}
            {imageUrl && <img src={imageUrl} alt={title} className="object-contain w-full h-full" />}
            {children}
        </div>
    </div>
);


export const ImageViewer: React.FC<ImageViewerProps> = ({ originalImageUrl, editedImageResult, isLoading }) => {
  return (
    <div className="w-full flex flex-col md:flex-row gap-6 md:gap-8">
      <ImageCard title="Original" imageUrl={originalImageUrl} />
      <ImageCard title="Edited" imageUrl={editedImageResult?.imageUrl} isLoading={isLoading}>
         {!editedImageResult?.imageUrl && !isLoading && (
            <div className="text-center text-gray-500">
                <p>Your edited image will appear here.</p>
            </div>
         )}
      </ImageCard>
    </div>
  );
};
