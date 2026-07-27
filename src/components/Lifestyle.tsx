import React from 'react';
import { useFormContext } from 'react-hook-form';
import type { BiodataFormValues } from '../lib/schema';

export const Lifestyle: React.FC = () => {
  const { register } = useFormContext<BiodataFormValues>();

  return (
    <div className="glass-card rounded-2xl p-6 md:p-8 mb-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 text-xl">🏠</div>
        <h3 className="text-xl font-semibold text-slate-800">Lifestyle</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Diet</label>
          <div className="flex flex-col gap-3">
            {['Vegetarian', 'Non Vegetarian', 'Jain'].map((option) => (
              <label key={option} className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="radio" 
                  value={option} 
                  {...register('diet')} 
                  className="w-4 h-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                />
                <span className="text-slate-700">{option}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Smoking</label>
          <div className="flex flex-col gap-3">
            {['Yes', 'No'].map((option) => (
              <label key={option} className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="radio" 
                  value={option} 
                  {...register('smoking')} 
                  className="w-4 h-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                />
                <span className="text-slate-700">{option}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Drinking</label>
          <div className="flex flex-col gap-3">
            {['Yes', 'No'].map((option) => (
              <label key={option} className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="radio" 
                  value={option} 
                  {...register('drinking')} 
                  className="w-4 h-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                />
                <span className="text-slate-700">{option}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
