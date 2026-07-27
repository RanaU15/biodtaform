import React from 'react';

interface ProgressBarProps {
  progress: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <div className="w-full max-w-5xl mx-auto mb-8 bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-sm border border-slate-100">
      <div className="flex justify-between items-end mb-2">
        <div>
          <h2 className="text-xl font-bold text-slate-800">📋 Biodata Form</h2>
          <p className="text-sm text-slate-500 mt-1">Please fill in your biodata carefully. All information will remain secure.</p>
        </div>
        <div className="text-right">
          <span className="text-2xl font-bold text-indigo-600">{Math.round(progress)}%</span>
        </div>
      </div>
      <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
        <div 
          className="bg-gradient-to-r from-indigo-500 to-indigo-600 h-3 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};
