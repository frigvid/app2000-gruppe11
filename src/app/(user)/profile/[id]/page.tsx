"use client";

import EditUserProfileModal from "@user/profile/components/edit-user-profile-modal";
import ProtectClientContent from "@auth/components/protect-client-content";
import UserStats from "@/app/(user)/profile/components/user-stats";
import Buffering from "@auth/components/fragment/Buffering";
import UnauthorizedError from "@ui/error/401_unauthorized";
import {createClient} from "@utils/supabase/client";
import React, {useEffect, useState} from "react";
import {usePathname} from "next/navigation";
import Avatar from "@mui/material/Avatar";
import Link from "next/link";
import FriendList from "@user/profile/components/friend-list";

/**
 * A given user's profile.
 *
 * It's available to everyone if the preference
 * `visibility` is set to `true`. Otherwise it's
 * only available to the given user.
 *
 * Friends are separately togglable in terms of
 * public/private visibility.
 *
 * @author frigvid
 * @created 2024-04-03
 */
export default function UserProfile() {
	const [isLoading, setIsLoading] = useState(true);
	const [data, setData] = useState(null);
	const [user, setUser] = useState(null);
	const staticUserId = usePathname().split('/').pop() || '';
	
	useEffect(() => {
		const fetchData = async () => {
			const supabase = createClient();
			const {data, error: PostgrestError} = await supabase.rpc("profile_get", {usr_id: staticUserId});
			const {data: {user}, error: AuthError} = await supabase.auth.getUser();
			
			if (PostgrestError) {
				console.error("Supabase RPC postgres error: " + PostgrestError);
			} else if (AuthError) {
				console.error("Supabase RPC auth error: " + AuthError);
			} else {
				setUser(user);
				setData(data.pop());
				setIsLoading(false);
			}
		};
		
		void fetchData();
	}, []);
	
	if (isLoading) {
		return <Buffering/>;
	}
	
	/**
	 * The JSX layout for the user's profile.
	 *
	 * Called by the authorization logic below this function.
	 */
	function profileLayout() {
		return (
			<main className="flex flex-col items-center justify-center bg-[#fffbf3] text-[#333] font-sans">
				<div className="bg-white max-w-[800px] m-5 p-5 shadow-md">
					{/* Header: User's avatar, and display name. */}
					<div className="bg-[#a1887f] text-white text-center p-5">
						<ProtectClientContent showError={false} noBuffer={true}>
							{
								// @ts-ignore
								<EditUserProfileModal
									avatar_url={data.avatar_url}
									display_name={data.display_name}
									about_me={data.about_me}
									nationality={data.nationality}
									visibility={data.visibility}
								/>
							}
						</ProtectClientContent>
						<div className="w-24 h-24 bg-[#a1887f] rounded-full mx-auto">
							<Avatar src={data.avatar_url} sx={{width: 96, height: 96}}/>
						</div>
						<h2 className="text-2xl">{data.display_name}</h2>
					</div>
					{/* Header: User's stats. */}
					<div className="flex justify-around p-5 bg-[#efebe9]">
						<UserStats
							elo_rank={data.elo_rank}
							games_played={data.wins + data.losses + data.draws}
							games_won={data.wins}
							games_lost={data.losses}
							games_drawn={data.draws}
							nationality={data.nationality}
						/>
					</div>
					{/* Body: About me. */}
					<div className="p-5">
						<h2 className="border-b-2 border-[#a1887f] pb-1 font-bold">About Me</h2>
						<p className="mt-2">
						{
							// Checks if the user has added any data yet.
							(data.about_me !== null)
								? ((data.about_me !== "")
									? data.about_me.split('\r\n').map((line: any, i: any) => <span key={i}>{line}<br/></span>)
									: null)
								: null
						}
						</p>
					</div>
					{/* Body: Friend's list. */}
					<div className="p-5">
						{
							(data.visibility_friends === true)
								? <FriendList/>
								: ((user !== null && staticUserId == user.id)
										? <FriendList/>
										: null)
						}
					</div>
				</div>
			</main>
		)
	}
	
	/**
	 * Authorization logic for viewing the profile of a user. Should be relatively secure, as
	 * I'm not grabbing the user from the session, but querying the authentication flow from
	 * Supabase, our authentication provider. And it checks, and makes sure you are who you are,
	 * and returns the correct user only then. It's a more expensive check, exactly for these
	 * kinds of operations.
	 *
	 * The process goes like this:
	 * 1. Return the profile layout if the user's profile visibility is public (true).
	 * 2. If the user's profile visibility is private (false), check if the user is logged in.
	 *    2.1. If the `user` object is null, and if not, if the `staticUserId` is *not* equal to
	 *    	  the `user.id` of the authenticated user, return a 401 error.
	 *    2.2. If a user *is* logged in, and the `staticUserId` is equal to the `user.id`, it
	 *         returns the profile layout.
	 */
	if (data.usr_visibility) {
		return (
			<>
				{profileLayout()}
			</>
		);
	} else if (!data.usr_visibility) {
		if (
			user == null ||
			!staticUserId == user.id
		) {
			return (
				<main className="flex flex-col justify-center items-center">
					<div className="mb-8">
						<UnauthorizedError/>
					</div>
					<Link
						href="/"
						className="bg-buttoncolor inline-block rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal"
					>
						Return to Home
					</Link>
				</main>
			)
		} else {
			return (
				<>
					{profileLayout()}
				</>
			)
		}
	};
}
