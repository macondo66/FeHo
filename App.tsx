
import React, { useState, useCallback, useMemo } from 'react';
import { editImageWithNanoBanana } from './services/geminiService';
import type { EditedImageResult, OriginalImage } from './types';
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { EditControls } from './components/EditControls';
import { ImageViewer } from './components/ImageViewer';
import { Loader } from './components/Loader';
import { Footer } from './components/Footer';
import { DownloadIcon } from './components/IconComponents';

export default function App() {
  const [originalImage, setOriginalImage] = useState<OriginalImage | null>(null);
  const [editedImage, setEditedImage] = useState<EditedImageResult | null>(null);
  const [prompt, setPrompt] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        setOriginalImage({ file, url: reader.result });
        setEditedImage(null);
        setError(null);
        setPrompt('');
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = useCallback(async () => {
    if (!originalImage || !prompt.trim()) {
      setError('Please upload an image and provide an editing prompt.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setEditedImage(null);

    try {
      const result = await editImageWithNanoBanana(originalImage.url, prompt);
      setEditedImage(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [originalImage, prompt]);

  const resetState = () => {
    setOriginalImage(null);
    setEditedImage(null);
    setPrompt('');
    setError(null);
    setIsLoading(false);
  };
  
  const downloadImage = () => {
    if (!editedImage) return;
    const link = document.createElement('a');
    link.href = editedImage.imageUrl;
    link.download = `edited_${originalImage?.file.name ?? 'image.png'}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };


  return (
    <div className="min-h-screen bg-gray-950 flex flex-col font-sans">
      <Header />
      <main className="flex-grow container mx-auto p-4 md:p-8 flex flex-col items-center">
        {!originalImage ? (
          <ImageUploader onImageUpload={handleImageUpload} />
        ) : (
          <div className="w-full max-w-6xl flex flex-col items-center gap-8">
            <ImageViewer 
              originalImageUrl={originalImage.url} 
              editedImageResult={editedImage}
              isLoading={isLoading} 
            />
             {editedImage && (
               <div className="bg-gray-850 p-4 rounded-lg shadow-lg text-center max-w-2xl">
                 <p className="text-gray-300 italic">"{editedImage.text}"</p>
               </div>
             )}

            <EditControls
              prompt={prompt}
              onPromptChange={setPrompt}
              onSubmit={handleSubmit}
              isLoading={isLoading}
              isEditingStarted={!!originalImage}
            />

            {error && <div className="bg-red-900/50 text-red-200 p-3 rounded-md w-full max-w-2xl text-center">{error}</div>}

            <div className="flex items-center gap-4 mt-4">
              {editedImage && (
                 <button
                    onClick={downloadImage}
                    className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300 shadow-md"
                  >
                   <DownloadIcon />
                   Download Edited Image
                 </button>
              )}
               <button
                  onClick={resetState}
                  className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300"
                >
                  Start Over
              </button>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
