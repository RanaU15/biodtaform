-- Create the biodata table
CREATE TABLE IF NOT EXISTS public.biodata (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),

    -- Personal Info
    full_name TEXT NOT NULL,
    gender TEXT,
    date_of_birth DATE,
    height_cm INTEGER,
    weight_kg INTEGER,
    blood_group TEXT,
    marital_status TEXT,
    religion TEXT,
    caste_community TEXT,
    mother_tongue TEXT,

    -- Contact Info
    mobile_number TEXT NOT NULL,
    email TEXT,
    current_address TEXT,
    permanent_address TEXT,

    -- Education
    highest_qualification TEXT,
    college_university TEXT,
    year_of_passing TEXT,

    -- Professional Details
    occupation TEXT,
    company_name TEXT,
    designation TEXT,
    annual_income TEXT,
    work_location TEXT,
    years_of_experience INTEGER,

    -- Family Details
    father_name TEXT,
    father_occupation TEXT,
    mother_name TEXT,
    mother_occupation TEXT,
    number_of_siblings INTEGER,
    family_type TEXT,

    -- Lifestyle
    diet TEXT,
    smoking TEXT,
    drinking TEXT,

    -- Partner Preferences
    preferred_age TEXT,
    preferred_height TEXT,
    preferred_education TEXT,
    preferred_occupation TEXT,
    preferred_location TEXT,
    other_preferences TEXT,

    -- Photos
    passport_photo_url TEXT NOT NULL,
    full_length_photo_url TEXT NOT NULL,
    family_photo_url TEXT,

    -- Additional Information
    hobbies TEXT,
    languages_known TEXT,
    about_yourself TEXT,
    any_other_details TEXT
);

-- Enable RLS (Row Level Security)
ALTER TABLE public.biodata ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (anyone can submit the form)
CREATE POLICY "Allow public inserts" ON public.biodata
    FOR INSERT WITH CHECK (true);

-- Create a trigger to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_biodata_updated_at
    BEFORE UPDATE ON public.biodata
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Storage Setup
-- Create the biodata-images bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public) 
VALUES ('biodata-images', 'biodata-images', true)
ON CONFLICT (id) DO NOTHING;

-- Storage Policies for 'biodata-images' bucket
-- Allow public read access to the bucket
CREATE POLICY "Public Read Access"
ON storage.objects FOR SELECT
USING (bucket_id = 'biodata-images');

-- Allow anonymous or authenticated uploads to the bucket
CREATE POLICY "Public Upload Access"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'biodata-images');

-- Alternatively, if only authenticated uploads are desired, use:
-- CREATE POLICY "Authenticated Upload Access"
-- ON storage.objects FOR INSERT
-- TO authenticated
-- WITH CHECK (bucket_id = 'biodata-images');
