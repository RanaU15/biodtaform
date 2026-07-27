import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import type { BiodataFormValues } from '../lib/schema';

export const PersonalInfo: React.FC = () => {
  const { register, watch, setValue, formState: { errors } } = useFormContext<BiodataFormValues>();
  const dob = watch('dateOfBirth');
  const [age, setAge] = useState<number | string>('');

  useEffect(() => {
    if (dob) {
      const birthDate = new Date(dob);
      const today = new Date();
      let calculatedAge = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        calculatedAge--;
      }
      setAge(calculatedAge > 0 ? calculatedAge : '');
    } else {
      setAge('');
    }
  }, [dob]);

  return (
    <div className="glass-card rounded-2xl p-6 md:p-8 mb-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 text-xl">👤</div>
        <h3 className="text-xl font-semibold text-slate-800">Personal Information</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Full Name *</label>
          <input 
            type="text" 
            {...register('fullName')} 
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
            placeholder="Enter your full name"
          />
          {errors.fullName && <p className="mt-1 text-sm text-red-500">{errors.fullName.message as string}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Gender *</label>
          <select 
            {...register('gender')} 
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none bg-white"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          {errors.gender && <p className="mt-1 text-sm text-red-500">{errors.gender.message as string}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Date of Birth *</label>
          <input 
            type="date" 
            {...register('dateOfBirth')} 
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
          />
          {errors.dateOfBirth && <p className="mt-1 text-sm text-red-500">{errors.dateOfBirth.message as string}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Age</label>
          <input 
            type="text" 
            value={age}
            readOnly
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-500 cursor-not-allowed outline-none"
            placeholder="Auto-calculated"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Height (cm) *</label>
          <input 
            type="number" 
            {...register('height')} 
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
            placeholder="e.g. 175"
          />
          {errors.height && <p className="mt-1 text-sm text-red-500">{errors.height.message as string}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Weight (kg) *</label>
          <input 
            type="number" 
            {...register('weight')} 
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
            placeholder="e.g. 70"
          />
          {errors.weight && <p className="mt-1 text-sm text-red-500">{errors.weight.message as string}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Blood Group *</label>
          <select 
            {...register('bloodGroup')} 
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none bg-white"
          >
            <option value="">Select Blood Group</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>
          {errors.bloodGroup && <p className="mt-1 text-sm text-red-500">{errors.bloodGroup.message as string}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Marital Status *</label>
          <select 
            {...register('maritalStatus')} 
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none bg-white"
          >
            <option value="">Select Status</option>
            <option value="Never Married">Never Married</option>
            <option value="Divorced">Divorced</option>
            <option value="Widowed">Widowed</option>
            <option value="Awaiting Divorce">Awaiting Divorce</option>
          </select>
          {errors.maritalStatus && <p className="mt-1 text-sm text-red-500">{errors.maritalStatus.message as string}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Religion *</label>
          <input 
            type="text" 
            {...register('religion')} 
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
            placeholder="e.g. Hindu, Muslim, Christian"
          />
          {errors.religion && <p className="mt-1 text-sm text-red-500">{errors.religion.message as string}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Caste / Community</label>
          <input 
            type="text" 
            {...register('casteCommunity')} 
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
            placeholder="Enter caste or community"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-slate-700 mb-1">Mother Tongue *</label>
          <input 
            type="text" 
            {...register('motherTongue')} 
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
            placeholder="e.g. Hindi, English, Gujarati"
          />
          {errors.motherTongue && <p className="mt-1 text-sm text-red-500">{errors.motherTongue.message as string}</p>}
        </div>
      </div>
    </div>
  );
};
