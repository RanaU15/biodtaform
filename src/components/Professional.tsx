import React from 'react';
import { useFormContext } from 'react-hook-form';
import type { BiodataFormValues } from '../lib/schema';

export const Professional: React.FC = () => {
  const { register, formState: { errors } } = useFormContext<BiodataFormValues>();

  return (
    <div className="glass-card rounded-2xl p-6 md:p-8 mb-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 text-xl">💼</div>
        <h3 className="text-xl font-semibold text-slate-800">Professional Details</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Occupation *</label>
          <input 
            type="text" 
            {...register('occupation')} 
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
            placeholder="e.g. Software Engineer, Doctor, Business"
          />
          {errors.occupation && <p className="mt-1 text-sm text-red-500">{errors.occupation.message as string}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Designation</label>
          <input 
            type="text" 
            {...register('designation')} 
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
            placeholder="e.g. Senior Manager"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Company Name</label>
          <input 
            type="text" 
            {...register('companyName')} 
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
            placeholder="e.g. Google, Own Business"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Annual Income</label>
          <input 
            type="text" 
            {...register('annualIncome')} 
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
            placeholder="e.g. 15 LPA or $100k"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Work Location</label>
          <input 
            type="text" 
            {...register('workLocation')} 
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
            placeholder="e.g. New York, Mumbai"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Years of Experience</label>
          <input 
            type="text" 
            {...register('yearsOfExperience')} 
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
            placeholder="e.g. 5 Years"
          />
        </div>
      </div>
    </div>
  );
};
