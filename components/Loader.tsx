
import React, { useState, useEffect } from 'react';

const loadingMessages = [
  "Painting with pixels...",
  "Consulting the creative AI...",
  "Adding a dash of magic...",
  "Warming up the digital canvas...",
  "Unleashing neural networks...",
  "This might take a moment...",
];

export const Loader: React.FC = () => {
  const [message, setMessage] = useState(loadingMessages[0]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setMessage(prevMessage => {
        const currentIndex = loadingMessages.indexOf(prevMessage);
        const nextIndex = (currentIndex + 1) % loadingMessages.length;
        return loadingMessages[nextIndex];
      });
    }, 2500);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-4 text-white">
      <div className="w-12 h-12 border-4 border-t-indigo-500 border-gray-600 rounded-full animate-spin"></div>
      <p className="text-lg font-medium tracking-wide">{message}</p>
    </div>
  );
};
