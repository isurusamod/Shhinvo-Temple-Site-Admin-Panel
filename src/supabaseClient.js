import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://efqzkcbwxhxovabqwbbt.supabase.com";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVmcXprY2J3eGh4b3ZhYnF3YmJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA5MDcwMzUsImV4cCI6MjA2NjQ4MzAzNX0.Hq41Byg7fOUncUzCoODzNqZvQ5u0yFjbt8hYZFe2kO8";

const supabase = createClient(supabaseUrl, supabaseKey);

export { supabase };