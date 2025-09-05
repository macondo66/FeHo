
import React from 'react';
import { SparklesIcon } from './IconComponents';

interface EditControlsProps {
  prompt: string;
  onPromptChange: (value: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
  isEditingStarted: boolean;
}

export const EditControls: React.FC<EditControlsProps> = ({ prompt, onPromptChange, onSubmit, isLoading, isEditingStarted }) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && !isLoading) {
      onSubmit();
    }
  };
    
  return (
    <div className="w-full max-w-2xl flex flex-col items-center gap-4">
      <div className="w-full relative">
        <input
          type="text"
          value={prompt}
          onChange={(e) => onPromptChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="e.g., 'add a birthday hat on the cat'"
          disabled={isLoading || !isEditingStarted}
          className="w-full bg-gray-800 border-2 border-gray-700 rounded-lg py-3 pl-4 pr-32 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
        />
        <button
          onClick={onSubmit}
          disabled={isLoading || !isEditingStarted || !prompt.trim()}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-indigo-600 text-white font-semibold rounded-md px-4 py-2 flex items-center gap-2 hover:bg-indigo-500 transition-all duration-300 disabled:bg-gray-600 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isLoading ? (
            'Generating...'
          ) : (
            <>
              <SparklesIcon />
              Generate
            </>
          )}
        </button>
      </div>
    </div>
  );
};
