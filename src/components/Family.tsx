import React from 'react';
import { useFormContext } from 'react-hook-form';
import type { BiodataFormValues } from '../lib/schema';

export const Family: React.FC = () => {
  const { register, formState: { errors } } = useFormContext<BiodataFormValues>();

  return (
    <div className="glass-card rounded-2xl p-6 md:p-8 mb-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 text-xl">👨‍👩‍👧</div>
        <h3 className="text-xl font-semibold text-slate-800">Family Details</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Father's Name *</label>
          <input 
            type="text" 
            {...register('fatherName')} 
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
            placeholder="Enter father's name"
          />
          {errors.fatherName && <p className="mt-1 text-sm text-red-500">{errors.fatherName.message as string}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Father's Occupation</label>
          <input 
            type="text" 
            {...register('fatherOccupation')} 
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
            placeholder="e.g. Business, Retired, etc."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Mother's Name *</label>
          <input 
            type="text" 
            {...register('motherName')} 
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
            placeholder="Enter mother's name"
          />
          {errors.motherName && <p className="mt-1 text-sm text-red-500">{errors.motherName.message as string}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Mother's Occupation</label>
          <input 
            type="text" 
            {...register('motherOccupation')} 
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
            placeholder="e.g. Homemaker, Teacher, etc."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Number of Siblings</label>
          <input 
            type="text" 
            {...register('numberOfSiblings')} 
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
            placeholder="e.g. 1 Brother, 1 Sister"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Family Type</label>
          <div className="flex gap-6 mt-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input 
                type="radio" 
                value="Joint" 
                {...register('familyType')} 
                className="w-4 h-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
              />
              <span className="text-slate-700">Joint</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input 
                type="radio" 
                value="Nuclear" 
                {...register('familyType')} 
                className="w-4 h-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
              />
              <span className="text-slate-700">Nuclear</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};
