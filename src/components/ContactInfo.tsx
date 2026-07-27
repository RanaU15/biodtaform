import React, { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import type { BiodataFormValues } from '../lib/schema';

export const ContactInfo: React.FC = () => {
  const { register, watch, setValue, formState: { errors } } = useFormContext<BiodataFormValues>();
  
  const sameAsCurrent = watch('sameAsCurrentAddress');
  const currentAddress = watch('currentAddress');

  useEffect(() => {
    if (sameAsCurrent) {
      setValue('permanentAddress', currentAddress || '', { shouldValidate: true });
    }
  }, [sameAsCurrent, currentAddress, setValue]);

  return (
    <div className="glass-card rounded-2xl p-6 md:p-8 mb-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 text-xl">📍</div>
        <h3 className="text-xl font-semibold text-slate-800">Contact Details</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Mobile Number *</label>
          <input 
            type="tel" 
            {...register('mobileNumber')} 
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
            placeholder="Enter mobile number"
          />
          {errors.mobileNumber && <p className="mt-1 text-sm text-red-500">{errors.mobileNumber.message as string}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Email ID</label>
          <input 
            type="email" 
            {...register('email')} 
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
            placeholder="Enter email address"
          />
          {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message as string}</p>}
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-slate-700 mb-1">Current Address *</label>
          <textarea 
            {...register('currentAddress')} 
            rows={3}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none resize-none"
            placeholder="Enter current residential address"
          />
          {errors.currentAddress && <p className="mt-1 text-sm text-red-500">{errors.currentAddress.message as string}</p>}
        </div>

        <div className="md:col-span-2 flex items-center">
          <input 
            type="checkbox" 
            id="sameAsCurrent"
            {...register('sameAsCurrentAddress')} 
            className="w-4 h-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500"
          />
          <label htmlFor="sameAsCurrent" className="ml-2 text-sm text-slate-700">Same as Current Address</label>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-slate-700 mb-1">Permanent Address *</label>
          <textarea 
            {...register('permanentAddress')} 
            rows={3}
            disabled={sameAsCurrent}
            className={`w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none resize-none ${sameAsCurrent ? 'bg-slate-50 text-slate-500' : ''}`}
            placeholder="Enter permanent address"
          />
          {errors.permanentAddress && <p className="mt-1 text-sm text-red-500">{errors.permanentAddress.message as string}</p>}
        </div>
      </div>
    </div>
  );
};
