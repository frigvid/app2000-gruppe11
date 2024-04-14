"use client";

import ProtectClientContent from "@auth/components/protect-client-content";
import OpenInBrowserIcon from "@mui/icons-material/OpenInBrowser";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import {createClient} from "@utils/supabase/client";
import PersonIcon from "@mui/icons-material/Person";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import React, {useEffect, useState} from "react";
import ListItem from "@mui/material/ListItem";
import {useTranslation} from "react-i18next";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import {User} from "@supabase/supabase-js";
import Avatar from "@mui/material/Avatar";
import {useRouter} from "next/navigation";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";

interface FriendListProps {
	user?: User;
}

/**
 * User profile's friend list component.
 *
 * @author frigvid
 * @created 2024-04-03
 */
export default function FriendList({
	user
}: FriendListProps) {
	const supabase = createClient()
	const [friends, setFriends] = useState(null);
	const router = useRouter();
	const {t} = useTranslation();
	
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
				<h2 className="border-b-2 border-[#a1887f] pb-1 font-bold">{t("user_profile.friend_list.label")}</h2>
				<div className="mt-2">
					{
						(friends.length === 0)
							? <p>{t("user_profile.friend_list.no_friends")}</p>
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
																	<Tooltip title={t("user_profile.friend_list.tooltip.open_profile")}>
																		<IconButton
																			edge="end"
																			aria-label={t("user_profile.friend_list.tooltip.open_profile")}
																			onClick={() => {
																				router.push("/profile/" + friend.id);
																			}}
																		>
																			<OpenInBrowserIcon/>
																		</IconButton>
																	</Tooltip>
																	{
																		(!user)
																			? null
																			: (
																				<ProtectClientContent showError={false} noBuffer={true}>
																					<Tooltip title={t("user_profile.friend_list.tooltip.remove_friend")}>
																						<IconButton
																							edge="end"
																							aria-label={t("user_profile.friend_list.tooltip.remove_friend")}
																							color="error"
																							onClick={async () => {
																								void await supabase.rpc("friend_remove", {other_user: friend.id});
																							}}
																						>
																							<DeleteIcon/>
																						</IconButton>
																					</Tooltip>
																				</ProtectClientContent>
																			)
																	}
																</div>
															}
														>
															<ListItemAvatar>
																{
																	(friend.avatar_url === null)
																		? <PersonIcon/>
																		: <Avatar src={friend.avatar_url}/>
																}
															</ListItemAvatar>
															<Tooltip title={t("user_profile.friend_list.tooltip.user_id_fragment") + " " + friend.display_name + ": " + friend.id}>
																<ListItemText primary={friend.display_name ? friend.display_name : friend.id}/>
															</Tooltip>
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
