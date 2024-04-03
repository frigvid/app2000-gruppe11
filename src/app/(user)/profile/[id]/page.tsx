"use client";

import {createClient} from "@utils/supabase/client";
import {useUser} from "@/app/(auth)/actions/useUser";
import {useEffect, useState} from "react";

/**
 * Stub page for user profiles.
 *
 * Currently not accessible without manually
 * inputting the link.
 *
 * @author frigvid
 */
export default function Page({ params }: { params: { id: string } }) {
	const user = useUser();
	const supabase = createClient();
	const [profile, setProfile] = useState(null);
	
	useEffect(() => {
		const fetchProfile = async () => {
			const {data, error} = await supabase
				.from('profiles')
				.select('*')
				.eq('id', user.id)
				.single();
	
			if (error) {
				console.error(error);
			} else {
				setProfile(data);
			}
		};
	
		if (user && user.id) {
			fetchProfile();
		}
	}, [user]);
	
	return (
		<main className="flex justify-center items-center">
			<div>
				<p>{params.id}</p>
				{profile ? <p>Profile found! Display name: {profile.display_name}</p> : <p>Profile not found.</p>}
			</div>
		</main>
	);
}
