"use client";

import {createClient} from "@utils/supabase/client";
import React, {useEffect, useState} from "react";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import IconButton from "@mui/material/IconButton";
import PersonAddDisabled from "@mui/icons-material/PersonAddDisabled";
import HowToReg from "@mui/icons-material/HowToReg";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Folder from "@mui/icons-material/Folder";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import {useRouter} from "next/navigation";
import OpenInBrowserIcon from '@mui/icons-material/OpenInBrowser';

/**
 * User profile's friend list component.
 *
 * @author frigvid
 * @created 2024-04-03
 */
export default function FriendList() {
	const supabase = createClient()
	const [friends, setFriends] = useState(null);
	const router = useRouter();
	
	useEffect(() => {
		const fetchFriends = async () => {
			const {data, error} = await supabase.rpc("friend_get_all_friends");
			
			if (error) {
				console.error("Fetching friends failed!", error);
			} else {
				setFriends(data);
			}
		};
		
		void fetchFriends()
	}, [supabase]);
	
	if (friends) {
		return (
			<section>
				<h2 className="border-b-2 border-[#a1887f] pb-1 font-bold">Friends</h2>
				<div className="mt-2">
					{
						(friends.length === 0)
							? <p>You do not have any friends.</p>
							: (
								<Paper style={{overflow: "auto"}}>
									<List className="w-full h-[10rem]">
										{
											friends.map((friend: any, index: number) => {
												return (
													[
														<ListItem
															key={friend.id + friend.display_name}
															secondaryAction={
																<div className="flex flex-row space-x-8 mr-4">
																	<IconButton
																		edge="end"
																		aria-label="open-profile"
																		className=""
																		onClick={() => {
																			router.push("/profile/" + friend.id);
																		}}
																	>
																		<OpenInBrowserIcon/>
																	</IconButton>
																</div>
															}
														>
															<ListItemAvatar>
																{
																	(friend.avatar_url === null)
																		? <Folder/>
																		: <Avatar src={friend.avatar_url}/>
																}
															</ListItemAvatar>
															<ListItemText
																primary={friend.display_name ? friend.display_name : friend.id}
															/>
														</ListItem>,
														<Divider key={self.crypto.randomUUID()}/>
													]
												)
											})
										}
									</List>
								</Paper>
							)
					}
				</div>
			</section>
		);
	}
}
