import { createClient } from '@supabase/supabase-js';

// In Lovable, these environment variables are automatically injected when Supabase is connected
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// For development, we'll create a client even if env vars are missing to avoid crashes
export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Database types
export interface ContactSubmission {
  id?: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  inquiry_type: string;
  created_at?: string;
  status?: 'new' | 'read' | 'responded';
}