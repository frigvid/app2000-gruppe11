"use client";

import ProtectClientContent from "@auth/components/protect-client-content";
import UserStats from "@/app/(user)/profile/components/user-stats";
import Buffering from "@auth/components/fragment/Buffering";
import {createClient} from "@utils/supabase/client";
import {usePathname} from "next/navigation";
import Edit from "@mui/icons-material/Edit";
import {useEffect, useState} from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button"

/**
 * Stub page for user profiles.
 *
 * Currently not accessible without manually
 * inputting the link.
 *
 * @author frigvid
 * @created 2024-04-03
 */
export default function UserProfile() {
	const [isLoading, setIsLoading] = useState(true);
	const [data, setData] = useState(null);
	const userId = usePathname().split('/').pop() || '';
	
	useEffect(() => {
		const fetchData = async () => {
			const supabase = createClient();
			const {data, error} = await supabase.rpc("user_profile_get", {usr_id: userId});
			
			if (error) {
				console.error("Supabase RPC error: " + error);
			} else {
				setData(data.pop());
				setIsLoading(false);
			}
		};
		
		void fetchData();
	}, []);
	
	if (isLoading) {
		return <Buffering/>;
	}
	
	return (
		<main className="flex flex-col items-center justify-center bg-[#fffbf3] text-[#333] font-sans">
			<div className="bg-white max-w-[800px] m-5 p-5 shadow-md">
				{/* Header: User's avatar, and display name. */}
				<div className="bg-[#a1887f] text-white text-center p-5">
					<ProtectClientContent showError={false} noBuffer={true}>
						<div className="absolute">
							<Button
								variant="outlined"
								color="inherit"
								size="small"
								href={userId + "/edit"}
							>
								<Edit fontSize="small"/>
							</Button>
						</div>
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
					<p>{data.about_me.split('\r\n').map((line: any, i: any) => <span key={i}>{line}<br/></span>)}</p>
				</div>
				{/* Body: Friend's list. */}
				<div className="p-5">
					<h2 className="border-b-2 border-[#a1887f] pb-1 font-bold">Friends</h2>
					<div className="mt-2">
						<p>
							<span className="underline" title="@omnissiah#1111">Omnissiah</span>
							<span>, </span>
							<span className="underline" title="@serbianatlasian#7774">Serbian Atlasian</span>
						</p>
					</div>
				</div>
			</div>
		</main>
	);
}
