import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/database';

const supabaseUrl = 'https://gtaykryswppsedmojiju.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd0YXlrcnlzd3Bwc2VkbW9qaWp1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzIwOTQwNjgsImV4cCI6MjA0NzY3MDA2OH0.aUkQiJKm0lBfORHpMW-cE3DeXI5-9mOvU4oQg07JiB0';
const serviceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd0YXlrcnlzd3Bwc2VkbW9qaWp1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczMjA5NDA2OCwiZXhwIjoyMDQ3NjcwMDY4fQ.5Ho-KBUTVcGDPVyysU9RVxCfFEhDoUYvvMDSsVJ5skk';

// Regular client for normal operations
export const supabase = createClient<Database>(supabaseUrl, supabaseKey);

// Service role client for admin operations
export const adminSupabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});