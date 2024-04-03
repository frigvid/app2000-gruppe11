"use client";

import {createClient} from "@utils/supabase/client";
import {useUser} from "@/app/(auth)/actions/useUser";
import {useEffect, useState} from "react";
import AboutMe from "@/app/(user)/profile/components/about-me";
import FriendList from "@/app/(user)/profile/components/friend-list";
import UserStats from "@/app/(user)/profile/components/user-stats";

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
	
	//<div>
	//	<p>{params.id}</p>
	//	{profile ? <p>Profile found! Display name: {profile.display_name}</p> : <p>Profile not found.</p>}
	//</div>
	
	//flex justify-center items-center
	
	//<main id="userProfile" className="flex flex-col min-h-screen bg-[#fffbf3] text-[#333] font-sans">
	//	<div className="bg-[#7f563b] text-white flex justify-between p-4">
	//		<UserStats/>
	//	</div>
	//	<div className="flex-grow flex items-center justify-center">
	//		<AboutMe/>
	//		<FriendList/>
	//	</div>
	//</main>
	
	return (
		
		<main className="flex flex-col items-center justify-center bg-[#fffbf3] text-[#333] font-sans">
			<div className="bg-white max-w-[800px] m-5 p-5 shadow-md">
				
				<div className="bg-[#a1887f] text-white text-center p-5">
					<div className="w-24 h-24 bg-[#a1887f] rounded-full mx-auto">
						<img src="ref/profile.png" alt="profile" className="rounded-full"/>
					</div>
					<h2 className="text-2xl">Display Name</h2>
				</div>
				
				<div className="flex justify-around p-5 bg-[#efebe9]">
					<UserStats/>
				</div>
				
				<div className="p-5">
					<h2 className="border-b-2 border-[#a1887f] pb-1">About Me</h2>
					<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus.</p>
				</div>
				
				<div className="p-5">
					<h2 className="border-b-2 border-[#a1887f] pb-1">Friends</h2>
					<div className="mt-2">
						<p>
							<span className="underline" title="@strangegiraffe#1184">Gurdian Sprite</span>
							<span>, </span>
							<span className="underline" title="@serbianatlasian#7774">Serbian Atlasian</span>
						</p>
					</div>
				</div>
			</div>
		</main>
	);
}
