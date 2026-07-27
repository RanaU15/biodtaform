import React from 'react';
import { useFormContext } from 'react-hook-form';
import type { BiodataFormValues } from '../lib/schema';

export const PartnerPreference: React.FC = () => {
  const { register } = useFormContext<BiodataFormValues>();

  return (
    <div className="glass-card rounded-2xl p-6 md:p-8 mb-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 text-xl">⭐</div>
        <h3 className="text-xl font-semibold text-slate-800">Partner Preferences (Optional)</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Preferred Age</label>
          <input 
            type="text" 
            {...register('preferredAge')} 
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
            placeholder="e.g. 25 - 29 Years"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Preferred Height</label>
          <input 
            type="text" 
            {...register('preferredHeight')} 
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
            placeholder="e.g. 5'3 to 5'8"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Preferred Education</label>
          <input 
            type="text" 
            {...register('preferredEducation')} 
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
            placeholder="e.g. Master's Degree"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Preferred Occupation</label>
          <input 
            type="text" 
            {...register('preferredOccupation')} 
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
            placeholder="e.g. Working Professional"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Preferred Location</label>
          <input 
            type="text" 
            {...register('preferredLocation')} 
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
            placeholder="e.g. Same City / State"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-slate-700 mb-1">Other Preferences</label>
          <textarea 
            {...register('otherPreferences')} 
            rows={3}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none resize-none"
            placeholder="Any specific preferences..."
          />
        </div>
      </div>
    </div>
  );
};
