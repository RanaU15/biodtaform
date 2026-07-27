import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { UploadCloud, X } from 'lucide-react';
import type { BiodataFormValues } from '../lib/schema';

interface PhotoUploadProps {
  name: 'passportPhoto' | 'fullLengthPhoto' | 'familyPhoto';
  label: string;
  required?: boolean;
}

const PhotoUploadField: React.FC<PhotoUploadProps> = ({ name, label, required }) => {
  const { register, watch, setValue, formState: { errors } } = useFormContext<BiodataFormValues>();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  
  const files = watch(name) as FileList | null;

  useEffect(() => {
    if (files && files.length > 0) {
      const file = files[0];
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setPreviewUrl(null);
    }
  }, [files]);

  const removeImage = (e: React.MouseEvent) => {
    e.preventDefault();
    setValue(name, null as any); // Clear the file
    setPreviewUrl(null);
  };

  return (
    <div className="flex flex-col">
      <label className="block text-sm font-medium text-slate-700 mb-2">{label} {required && '*'}</label>
      
      {!previewUrl ? (
        <div className="relative border-2 border-dashed border-slate-300 rounded-xl p-6 flex flex-col items-center justify-center hover:border-indigo-500 hover:bg-indigo-50/50 transition-all cursor-pointer group h-48">
          <UploadCloud className="w-10 h-10 text-slate-400 group-hover:text-indigo-500 mb-2 transition-colors" />
          <p className="text-sm text-slate-600 text-center font-medium">Click to upload or drag and drop</p>
          <p className="text-xs text-slate-400 mt-1">JPG, PNG, WEBP (Max. 5MB)</p>
          <input 
            type="file" 
            accept="image/jpeg, image/png, image/webp, image/jpg"
            {...register(name)} 
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
        </div>
      ) : (
        <div className="relative border border-slate-200 rounded-xl overflow-hidden h-48 group">
          <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <button 
              onClick={removeImage}
              className="bg-white/20 hover:bg-red-500 text-white rounded-full p-2 backdrop-blur-sm transition-colors"
              title="Remove image"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}
      
      {errors[name] && (
        <p className="mt-1 text-sm text-red-500">{errors[name]?.message as string}</p>
      )}
    </div>
  );
};

export const PhotoUpload: React.FC = () => {
  return (
    <div className="glass-card rounded-2xl p-6 md:p-8 mb-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 text-xl">📷</div>
        <h3 className="text-xl font-semibold text-slate-800">Photos</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <PhotoUploadField name="passportPhoto" label="Passport Size Photo" required />
        <PhotoUploadField name="fullLengthPhoto" label="Full Length Photo" required />
        <PhotoUploadField name="familyPhoto" label="Family Photo" />
      </div>
    </div>
  );
};
