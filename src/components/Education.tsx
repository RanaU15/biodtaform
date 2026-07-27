import React from 'react';
import { useFormContext } from 'react-hook-form';
import type { BiodataFormValues } from '../lib/schema';

export const Education: React.FC = () => {
  const { register, formState: { errors } } = useFormContext<BiodataFormValues>();

  return (
    <div className="glass-card rounded-2xl p-6 md:p-8 mb-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 text-xl">🎓</div>
        <h3 className="text-xl font-semibold text-slate-800">Education Details</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-slate-700 mb-1">Highest Qualification *</label>
          <input 
            type="text" 
            {...register('highestQualification')} 
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
            placeholder="e.g. Master's in Computer Science, MBA, etc."
          />
          {errors.highestQualification && <p className="mt-1 text-sm text-red-500">{errors.highestQualification.message as string}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">College / University</label>
          <input 
            type="text" 
            {...register('collegeUniversity')} 
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
            placeholder="e.g. Stanford University"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Year of Passing</label>
          <input 
            type="text" 
            {...register('yearOfPassing')} 
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
            placeholder="e.g. 2022"
          />
        </div>
      </div>
    </div>
  );
};
