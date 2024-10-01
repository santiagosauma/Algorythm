import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://jkcybovpglrfljgoglxw.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImprY3lib3ZwZ2xyZmxqZ29nbHh3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjc4MjE1MDcsImV4cCI6MjA0MzM5NzUwN30.JUYYlVeAG1saq1tzvOglw4aKxH_cosXUrRbd6G3PzJg';

export const supabase = createClient(supabaseUrl, supabaseAnonKey); 