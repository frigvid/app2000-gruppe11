import { createClient } from '@utils/supabase/server'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

export default async function PrivatePage() {
	const cookieStore = cookies()
	const supabase = createClient(cookieStore)
	
	const { data, error } = await supabase.auth.getUser()
	if (error || !data?.user) {
		redirect('/')
	}
	
	return <p>Hello {data.user.email}</p>
}
