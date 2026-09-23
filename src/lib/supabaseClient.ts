import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://mciwsjcvjfumenautply.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_gZ6R91ah-FvSgWXCVk7sUA_T1kEWVDd';

export const supabase = createClient(supabaseUrl, supabaseKey);
