import React, { useState, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { biodataSchema, type BiodataFormValues } from '../lib/schema';
import { supabase } from '../lib/supabase';

import { ProgressBar } from './ProgressBar';
import { PersonalInfo } from './PersonalInfo';
import { ContactInfo } from './ContactInfo';
import { Education } from './Education';
import { Professional } from './Professional';
import { Family } from './Family';
import { Lifestyle } from './Lifestyle';
import { PartnerPreference } from './PartnerPreference';
import { PhotoUpload } from './PhotoUpload';
import { AdditionalInfo } from './AdditionalInfo';
import { SuccessModal } from './SuccessModal';

export const BiodataForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [progress, setProgress] = useState(0);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const methods = useForm<BiodataFormValues>({
    resolver: zodResolver(biodataSchema),
    mode: 'onChange',
    defaultValues: {
      sameAsCurrentAddress: false,
    }
  });

  const { handleSubmit, watch, reset } = methods;

  // Watch all values to calculate progress
  const formValues = watch();

  useEffect(() => {
    // Basic progress calculation based on some key fields
    const requiredFields = [
      'fullName', 'gender', 'dateOfBirth', 'height', 'weight', 'bloodGroup', 'maritalStatus', 'religion', 'motherTongue',
      'mobileNumber', 'currentAddress', 'permanentAddress',
      'highestQualification', 'occupation', 'fatherName', 'motherName'
    ];
    
    let filled = 0;
    requiredFields.forEach(field => {
      if (formValues[field as keyof BiodataFormValues]) filled++;
    });
    
    // Also check photos
    if (formValues.passportPhoto && formValues.passportPhoto.length > 0) filled++;
    if (formValues.fullLengthPhoto && formValues.fullLengthPhoto.length > 0) filled++;

    const totalFields = requiredFields.length + 2; // +2 for required photos
    const calculatedProgress = Math.min(100, Math.round((filled / totalFields) * 100));
    setProgress(calculatedProgress);
  }, [formValues]);

  const uploadFile = async (fileList: any, pathName: string) => {
    if (!fileList || fileList.length === 0) return null;
    const file = fileList[0];
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
    const filePath = `${pathName}/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('biodata-images')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage.from('biodata-images').getPublicUrl(filePath);
    return data.publicUrl;
  };

  const onSubmit = async (data: BiodataFormValues) => {
    try {
      setIsSubmitting(true);
      setErrorMsg(null);

      // 1. Upload Photos
      const passportUrl = await uploadFile(data.passportPhoto, 'passport');
      const fullLengthUrl = await uploadFile(data.fullLengthPhoto, 'full_length');
      const familyUrl = await uploadFile(data.familyPhoto, 'family');

      // 2. Insert into Database
      const dbPayload = {
        full_name: data.fullName,
        gender: data.gender,
        date_of_birth: data.dateOfBirth,
        height_cm: parseInt(data.height, 10),
        weight_kg: parseInt(data.weight, 10),
        blood_group: data.bloodGroup,
        marital_status: data.maritalStatus,
        religion: data.religion,
        caste_community: data.casteCommunity || null,
        mother_tongue: data.motherTongue,

        mobile_number: data.mobileNumber,
        email: data.email || null,
        current_address: data.currentAddress,
        permanent_address: data.permanentAddress,

        highest_qualification: data.highestQualification,
        college_university: data.collegeUniversity || null,
        year_of_passing: data.yearOfPassing || null,

        occupation: data.occupation,
        company_name: data.companyName || null,
        designation: data.designation || null,
        annual_income: data.annualIncome || null,
        work_location: data.workLocation || null,
        years_of_experience: data.yearsOfExperience ? parseInt(data.yearsOfExperience, 10) : null,

        father_name: data.fatherName,
        father_occupation: data.fatherOccupation || null,
        mother_name: data.motherName,
        mother_occupation: data.motherOccupation || null,
        number_of_siblings: data.numberOfSiblings ? parseInt(data.numberOfSiblings, 10) : null,
        family_type: data.familyType || null,

        diet: data.diet || null,
        smoking: data.smoking || null,
        drinking: data.drinking || null,

        preferred_age: data.preferredAge || null,
        preferred_height: data.preferredHeight || null,
        preferred_education: data.preferredEducation || null,
        preferred_occupation: data.preferredOccupation || null,
        preferred_location: data.preferredLocation || null,
        other_preferences: data.otherPreferences || null,

        passport_photo_url: passportUrl,
        full_length_photo_url: fullLengthUrl,
        family_photo_url: familyUrl,

        hobbies: data.hobbies || null,
        languages_known: data.languagesKnown || null,
        about_yourself: data.aboutYourself || null,
        any_other_details: data.anyOtherDetails || null
      };

      const { error: dbError } = await supabase
        .from('biodata')
        .insert(dbPayload);

      if (dbError) throw dbError;

      // Success
      setShowSuccess(true);
    } catch (error: any) {
      console.error('Submission error:', error);
      setErrorMsg(error.message || 'An error occurred while saving the biodata.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    reset();
    setShowSuccess(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="w-full max-w-5xl mx-auto py-8 px-4 md:px-0">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <ProgressBar progress={progress} />
          
          {errorMsg && (
            <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl p-4 mb-6">
              {errorMsg}
            </div>
          )}

          <PersonalInfo />
          <ContactInfo />
          <Education />
          <Professional />
          <Family />
          <Lifestyle />
          <PartnerPreference />
          <PhotoUpload />
          <AdditionalInfo />

          <div className="flex justify-end pt-4 pb-12">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:-translate-y-0.5 transition-all w-full sm:w-auto min-w-[200px] disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Saving Biodata...
                </>
              ) : (
                'Save Biodata'
              )}
            </button>
          </div>
        </form>
      </FormProvider>

      <SuccessModal 
        isOpen={showSuccess} 
        onClose={() => setShowSuccess(false)} 
        onReset={handleReset} 
      />
    </div>
  );
};
