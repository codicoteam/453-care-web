import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
export const supabase = createClient(
    "https://aamokxxnfpmdpayvmngs.supabase.co", 
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFhbW9reHhuZnBtZHBheXZtbmdzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczNTA1MjQxNywiZXhwIjoyMDUwNjI4NDE3fQ.yYhXFOpFFO79wP0sV8zoMZLjcDmBfu5yEHcmTNONfpY")




