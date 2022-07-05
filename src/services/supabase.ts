import { createClient } from '@supabase/supabase-js'

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}`
const ANON_KEY = `${process.env.NEXT_PUBLIC_ANON_KEY}`

const supabase = createClient(API_URL, ANON_KEY)

export default supabase