
import React from 'react';
import { MagicWandIcon } from './IconComponents';

export const Header: React.FC = () => {
  return (
    <header className="bg-gray-900/50 backdrop-blur-sm sticky top-0 z-10 w-full border-b border-gray-800">
      <div className="container mx-auto px-4 py-4 flex items-center justify-center">
        <MagicWandIcon />
        <h1 className="ml-3 text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-500">
          AI Photo Studio
        </h1>
      </div>
    </header>
  );
};
