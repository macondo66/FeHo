
import React, { useCallback, useState } from 'react';
import { UploadIcon } from './IconComponents';

interface ImageUploaderProps {
  onImageUpload: (file: File) => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onImageUpload(e.target.files[0]);
    }
  };
  
  const handleDrop = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onImageUpload(e.dataTransfer.files[0]);
    }
  }, [onImageUpload]);

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragEnter = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };
  
  const handleDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  return (
    <div className="w-full max-w-lg text-center flex flex-col items-center justify-center p-8">
      <h2 className="text-2xl font-semibold mb-2 text-gray-200">Start by Uploading an Image</h2>
      <p className="text-gray-400 mb-6">Drag & drop a file or click to select one.</p>
      <label
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        className={`group w-full h-64 border-2 border-dashed rounded-xl flex flex-col justify-center items-center cursor-pointer transition-colors duration-300 ${isDragging ? 'border-indigo-500 bg-gray-800/50' : 'border-gray-700 hover:border-indigo-500 hover:bg-gray-900'}`}
      >
        <input type="file" className="hidden" onChange={handleFileChange} accept="image/png, image/jpeg, image/webp" />
        <UploadIcon />
        <p className="mt-2 text-gray-500 group-hover:text-indigo-400 transition-colors">
          {isDragging ? 'Drop the image here!' : 'Click or drop to upload'}
        </p>
        <span className="text-xs text-gray-600 mt-1">PNG, JPG, WEBP supported</span>
      </label>
    </div>
  );
};
