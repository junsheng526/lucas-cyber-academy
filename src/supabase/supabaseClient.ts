import { createClient } from "@supabase/supabase-js";

// Replace with your actual Supabase URL and anon key
const SUPABASE_URL = "https://nmfckzhfkmbyjwlmyfzd.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5tZmNremhma21ieWp3bG15ZnpkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYwOTEwNDAsImV4cCI6MjA1MTY2NzA0MH0.kJSZozoJfRG3_DrFRv2TC8nwzi5kM90WGNDQZmjYD-c";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
