import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://rrcoknnsrtewavshriag.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJyY29rbm5zcnRld2F2c2hyaWFnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzUyMTk0MTksImV4cCI6MjA1MDc5NTQxOX0.V9AauLX6lVNbeJ_zbzLKpB9X2kmRyF_fqeLZOdU8Z6Q";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);