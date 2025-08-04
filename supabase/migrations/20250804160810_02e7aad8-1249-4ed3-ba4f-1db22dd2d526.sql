-- Create listings table for workspace data
CREATE TABLE public.listings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  location TEXT NOT NULL,
  image_url TEXT NOT NULL,
  neuro_score DECIMAL(3,1) NOT NULL CHECK (neuro_score >= 0 AND neuro_score <= 10),
  user_rating DECIMAL(2,1) NOT NULL CHECK (user_rating >= 0 AND user_rating <= 5),
  certification TEXT NOT NULL,
  amenities JSONB NOT NULL DEFAULT '[]'::jsonb,
  full_description TEXT NOT NULL,
  price TEXT NOT NULL,
  capacity TEXT NOT NULL,
  hours_of_operation TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.listings ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access (listings should be visible to everyone)
CREATE POLICY "Listings are publicly viewable" 
ON public.listings 
FOR SELECT 
USING (true);

-- Add trigger for automatic timestamp updates
CREATE TRIGGER update_listings_updated_at
BEFORE UPDATE ON public.listings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();