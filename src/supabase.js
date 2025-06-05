import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://rzsnmxyxpmwcewwszaad.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ6c25teHl4cG13Y2V3d3N6YWFkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkxMDg5MDMsImV4cCI6MjA2NDY4NDkwM30.fffd6hpi9ECJwhZHoPUxd4a1yuiMXVWsH-rcUF0Xrx8";

export const supabase = createClient(supabaseUrl, supabaseKey);
