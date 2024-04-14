"use client";

import VerticalAlignBottomIcon from "@mui/icons-material/VerticalAlignBottom";
import WarnBeforeDelete from "@auth/dashboard/components/warn-before-delete";
import ProtectClientContent from "@auth/components/protect-client-content";
import VerticalAlignTopIcon from "@mui/icons-material/VerticalAlignTop";
import Buffering from "@auth/components/fragment/Buffering";
import UnauthorizedError from "@ui/error/401_unauthorized";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import {createClient} from "@utils/supabase/client";
import PersonIcon from "@mui/icons-material/Person";
import IconButton from "@mui/material/IconButton";
import React, {useEffect, useState} from "react";
import ListItem from "@mui/material/ListItem";
import {useTranslation} from "react-i18next";
import Tooltip from "@mui/material/Tooltip";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import Link from "next/link";

/**
 * Administrator dashboard.
 *
 * Administrators can promote/demote users to
 * admin status, or delete them from here.
 *
 * @author frigvid
 * @created 2024-04-11
 */
export default function AdministratorDashboard() {
	const supabase = createClient();
	const {t} = useTranslation();
	const [isLoading, setIsLoading] = useState(true);
	const [isAdmin, setIsAdmin] = useState(null);
	const [admin, setAdmin] = useState(null);
	const [users, setUsers] = useState(null);
	const [isUserAdmin, setIsUserAdmin] = useState(null);
	
	useEffect(() => {
		setIsLoading(true);
		
		const fetchAdminStatus = async () => {
			const {data, error} = await supabase.rpc("admin_is_admin");
			
			if (error) {
				console.error("Supabase RPC error: " + error);
			} else {
				setIsAdmin(data);
			}
		};
		
		const fetchAdmin = async () => {
			const {data: {user}, error} = await supabase.auth.getUser();
			
			if (error) {
				console.error("Something went wrong fetching the administrator", error);
			} else {
				setAdmin(user);
			}
		};
		
		const fetchUsers = async () => {
			const {data, error} = await supabase.rpc("user_get_all_users");
			
			if (error) {
				console.error("Something went wrong while fetching all users!", error);
			} else {
				setUsers(data);
			}
		};
		
		void fetchAdminStatus();
		void fetchAdmin();
		void fetchUsers();
		
		setIsLoading(false);
	}, [setIsLoading, supabase]);
	
	useEffect(() => {
		setIsLoading(true);
		
		if (users) {
			const fetchIsUserAdmin = async () => {
				const statuses = {};
				
				for (const user of users) {
					const {data, error} = await supabase.rpc("admin_check_if_admin", {user_to_check: user.id});
					
					if (error) {
						console.error("Checking if " + user.id + "was an administrator went wrong!", error)
					} else {
						statuses[user.id] = data;
					}
				}
				
				setIsUserAdmin(statuses);
			};
			
			void fetchIsUserAdmin();
		}
		
		setIsLoading(false);
	}, [setIsLoading, supabase, users, setIsUserAdmin]);
	
	if (isLoading || users === null || isUserAdmin === null) {
		return <Buffering/>;
	}
	
	/**
	 * Only return the administrator dashboard for administrator users.
	 *
	 * Since this is using a database function, we're guaranteed to only
	 * grant access to authenticated users, and specifically those which
	 * are administrators.
	 */
	if (isAdmin) {
		return (
			<main className="flex flex-col items-center justify-center bg-[#fffbf3] text-[#333] font-sans">
				<div className="bg-white w-full h-full md:w-[40rem] m-5 p-5 shadow-md">
					<section className="space-y-2">
						<h2 className="block text-gray-700 text-md font-bold text-center">{t("admin_dashboard.users.label")}</h2>
						<p className="italic text-xs text-center">{t("admin_dashboard.users.notice")}</p>
						<Paper style={{overflow: "auto"}} sx={{height: 1}}>
							<List className="w-full h-[22rem] lg:h-min-[26rem] lg:h-[28rem]">
								{
									(users.length === 0)
										? <p>{t("admin_dashboard.users.warning")}</p>
										: (
											users.map((user: any, index: number) => {
												/**
												 * This deletes the ListItem and Divider when called.
												 *
												 * It creates a new array with the elements that match, so literally
												 * everything that isn't this current `user` mapping. In
												 * effect, deleting it.
												 */
												const deleteListing = () => {
													setUsers(users.filter((_: any, i: any) => i !== index));
												};
												
												/**
												 * Don't return a listing where that is the same as the
												 * administrator.
												 *
												 * Not that this is particularly good UX or anything,
												 * but this does make the logic a bit easier to implement.
												 */
												if (user.id === admin.id) {
													return null;
												} else {
													return (
														[
															<ListItem
																key={user.id + user.display_name}
																secondaryAction={
																	<div className="flex flex-row space-x-6">
																		<Tooltip title={
																			isUserAdmin[user.id]
																				? t("admin_dashboard.users.demote.tooltip")
																				: t("admin_dashboard.users.promote.tooltip")
																		}>
																			<IconButton
																				edge="end"
																				aria-label={
																					isUserAdmin[user.id]
																						? t("admin_dashboard.users.demote.tooltip")
																						: t("admin_dashboard.users.promote.tooltip")
																				}
																				color={
																					isUserAdmin[user.id]
																						? "default"
																						: "info"
																				}
																				onClick={async () => {
																					if (isUserAdmin[user.id]) {
																						void await supabase.rpc("admin_demote_to_user", {
																							admin_to_demote: user.id
																						});
																					} else {
																						void await supabase.rpc("admin_promote_to_admin", {
																							user_to_promote: user.id
																						});
																					}
																					
																					setIsUserAdmin({...isUserAdmin, [user.id]: !isUserAdmin[user.id]});
																				}}
																			>
																				{
																					isUserAdmin[user.id]
																						? <VerticalAlignBottomIcon/>
																						: <VerticalAlignTopIcon/>
																				}
																			</IconButton>
																		</Tooltip>
																		{
																			(!user)
																				? null
																				: (
																					<ProtectClientContent showError={false} noBuffer={true}>
																						<WarnBeforeDelete
																							id={user.id}
																							display_name={user.display_name}
																							supabase={supabase}
																							deleteListing={deleteListing}
																						/>
																					</ProtectClientContent>
																				)
																		}
																	</div>
																}
															>
																<ListItemAvatar>
																	{
																		(user.avatar_url === null)
																			? <PersonIcon/>
																			: <Avatar src={user.avatar_url}/>
																	}
																</ListItemAvatar>
																<Tooltip title={t("user_profile.friend_list.tooltip.user_id_fragment") + " " + user.display_name + ": " + user.id}>
																	<ListItemText primary={user.display_name ? user.display_name : user.id}/>
																</Tooltip>
															</ListItem>,
															<Divider key={self.crypto.randomUUID()}/>
														]
													)
												}
											})
										)
								}
							</List>
						</Paper>
					</section>
				</div>
			</main>
		)
	} else {
		return (
			<main className="flex flex-col justify-center items-center">
				<div className="mb-8">
					<UnauthorizedError/>
				</div>
				<Link
					href="/"
					className="bg-buttoncolor inline-block rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal"
				>
					Return to home
				</Link>
			</main>
		)
	}
}
