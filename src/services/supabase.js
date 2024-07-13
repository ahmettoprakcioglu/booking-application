
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://qicvumtranchbgoohnwu.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFpY3Z1bXRyYW5jaGJnb29obnd1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjA5MDAzMDYsImV4cCI6MjAzNjQ3NjMwNn0.xVX2ts61Fly57bcVXTGRX6-RGM-C4jt6ghQ1Ck5nCh0';
console.log('supabaseKey: ', supabaseKey);
const supabase = createClient(supabaseUrl, supabaseKey);


export default supabase;