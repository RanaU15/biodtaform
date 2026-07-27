import { z } from 'zod';

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const imageSchema = z
  .any()
  .refine((files) => files?.length == 1, "Image is required.")
  .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
  .refine(
    (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
    ".jpg, .jpeg, .png and .webp files are accepted."
  );

const optionalImageSchema = z
  .any()
  .optional()
  .refine((files) => !files || files.length === 0 || files[0]?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
  .refine(
    (files) => !files || files.length === 0 || ACCEPTED_IMAGE_TYPES.includes(files[0]?.type),
    ".jpg, .jpeg, .png and .webp files are accepted."
  );

export const biodataSchema = z.object({
  // Personal Info
  fullName: z.string().min(2, 'Full name is required'),
  gender: z.enum(['Male', 'Female', 'Other'], { required_error: 'Please select a gender' }),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  height: z.string().min(1, 'Height is required'),
  weight: z.string().min(1, 'Weight is required'),
  bloodGroup: z.string().min(1, 'Blood group is required'),
  maritalStatus: z.string().min(1, 'Marital status is required'),
  religion: z.string().min(1, 'Religion is required'),
  casteCommunity: z.string().optional(),
  motherTongue: z.string().min(1, 'Mother tongue is required'),

  // Contact Details
  mobileNumber: z.string().min(10, 'Valid mobile number is required'),
  email: z.string().email('Valid email is required').optional().or(z.literal('')),
  currentAddress: z.string().min(5, 'Current address is required'),
  permanentAddress: z.string().min(5, 'Permanent address is required'),
  sameAsCurrentAddress: z.boolean().default(false),

  // Education
  highestQualification: z.string().min(1, 'Highest qualification is required'),
  collegeUniversity: z.string().optional(),
  yearOfPassing: z.string().optional(),

  // Professional Details
  occupation: z.string().min(1, 'Occupation is required'),
  companyName: z.string().optional(),
  designation: z.string().optional(),
  annualIncome: z.string().optional(),
  workLocation: z.string().optional(),
  yearsOfExperience: z.string().optional(),

  // Family Details
  fatherName: z.string().min(1, 'Father\'s name is required'),
  fatherOccupation: z.string().optional(),
  motherName: z.string().min(1, 'Mother\'s name is required'),
  motherOccupation: z.string().optional(),
  numberOfSiblings: z.string().optional(),
  familyType: z.enum(['Joint', 'Nuclear']).optional(),

  // Lifestyle
  diet: z.enum(['Vegetarian', 'Non Vegetarian', 'Jain']).optional(),
  smoking: z.enum(['Yes', 'No']).optional(),
  drinking: z.enum(['Yes', 'No']).optional(),

  // Partner Preferences
  preferredAge: z.string().optional(),
  preferredHeight: z.string().optional(),
  preferredEducation: z.string().optional(),
  preferredOccupation: z.string().optional(),
  preferredLocation: z.string().optional(),
  otherPreferences: z.string().optional(),

  // Photos
  passportPhoto: imageSchema,
  fullLengthPhoto: imageSchema,
  familyPhoto: optionalImageSchema,

  // Additional Info
  hobbies: z.string().optional(),
  languagesKnown: z.string().optional(),
  aboutYourself: z.string().optional(),
  anyOtherDetails: z.string().optional(),
});

export type BiodataFormValues = z.infer<typeof biodataSchema>;
