import React from 'react';
import { CheckCircle2 } from 'lucide-react';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReset: () => void;
}

export const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, onClose, onReset }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl animate-in zoom-in-95 duration-300">
        <div className="flex flex-col items-center text-center">
          <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6">
            <CheckCircle2 className="w-12 h-12 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Biodata Saved Successfully</h2>
          <p className="text-slate-500 mb-8">Your biodata has been securely saved and the photos have been uploaded.</p>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full">
            <button 
              onClick={onReset}
              className="flex-1 px-6 py-3 rounded-xl border border-slate-200 text-slate-700 font-medium hover:bg-slate-50 transition-colors"
            >
              Create New
            </button>
            <button 
              onClick={onClose}
              className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-600 text-white font-medium hover:shadow-lg hover:shadow-indigo-500/30 transition-all"
            >
              View Biodata
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
