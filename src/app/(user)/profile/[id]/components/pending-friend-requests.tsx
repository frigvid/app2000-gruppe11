"use client";

import PersonAddDisabled from '@mui/icons-material/PersonAddDisabled';
import React, {Fragment, useEffect, useState} from "react";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import {Dialog, Transition} from "@headlessui/react";
import HowToReg from "@mui/icons-material/HowToReg";
import {createClient} from "@utils/supabase/client";
import PersonIcon from "@mui/icons-material/Person";
import IconButton from "@mui/material/IconButton";
import HailIcon from "@mui/icons-material/Hail";
import ListItem from "@mui/material/ListItem";
import {useTranslation} from "react-i18next";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";

/**
 * Modal for showing pending friend requests.
 *
 * @author frigvid
 * @created 2024-04-12
 */
export default function PendingFriendRequests() {
	const supabase = createClient();
	const [isOpen, setIsOpen] = useState(false);
	const [friendRequests, setFriendRequests] = useState(null);
	const {t} = useTranslation();
	
	useEffect(() => {
		const fetchRequests = async () => {
			const {data, error} = await supabase.rpc("friend_request_get_all");
			
			if (error) {
				console.error("Could not get friend requests.", error);
			} else {
				setFriendRequests(data);
			}
		}
		
		void fetchRequests();
	}, [supabase]);
	
	function closeModal() {
		setIsOpen(false);
	}
	
	function openModal() {
		setIsOpen(true);
	}
	
	if (friendRequests) {
		return (
			<>
				<Tooltip title={t("user_profile.friend_requests.tooltip.button")}>
					<Button
						variant="outlined"
						color="inherit"
						size="small"
						onClick={openModal}
					>
						<HailIcon fontSize="small"/>
					</Button>
				</Tooltip>
				<Transition appear show={isOpen} as={Fragment}>
					<Dialog
						as="div"
						className="relative z-10"
						onClose={closeModal}
					>
						<div className="fixed inset-0 overflow-y-auto">
							<div className="flex min-h-full items-center justify-center p-4 text-center">
								<Transition.Child
									as={Fragment}
									enter="ease-out duration-300"
									enterFrom="opacity-0 scale-95"
									enterTo="opacity-100 scale-100"
									leave="ease-in duration-200"
									leaveFrom="opacity-100 scale-100"
									leaveTo="opacity-0 scale-95"
								>
									<Dialog.Panel
										className="xs:w-full xs:h-full lg:w-[40rem] lg:h-[38rem] transform overflow-hidden lg:rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
									>
										<Dialog.Title
											as="h3"
											className="text-lg mb-3 text-center font-semibold leading-6 text-gray-900"
										>
											{t("user_profile.friend_requests.label")}
										</Dialog.Title>
										<section className="flex justify-center items-center flex-col">
											{
												(friendRequests.length === 0)
													? <p className="mt-10">{t("user_profile.friend_requests.no_pending")}</p>
													: (
														<Paper style={{overflow: "auto"}}>
															<List className="w-[30rem] h-[31rem] bg-foreground">
																{
																	friendRequests.map((friendRequest: any, index: number) => {
																		/**
																		 * This deletes the ListItem and Divider when called. Used for when
																		 * users click on either the accept or reject button.
																		 *
																		 * It creates a new array with the elements that match, so literally
																		 * everything that isn't this current `friendRequest` mapping. In
																		 * effect, deleting it.
																		 */
																		const deleteListing = () => {
																			setFriendRequests(friendRequests.filter((_: any, i: any) => i !== index));
																		};
																		
																		return (
																			[
																				<ListItem
																					key={friendRequest.id + friendRequest.display_name}
																					secondaryAction={
																						<div className="flex flex-row space-x-8">
																							<Tooltip title={t("user_profile.friend_requests.tooltip.reject")}>
																								<IconButton
																									edge="end"
																									aria-label={t("user_profile.friend_requests.tooltip.reject")}
																									color="error"
																									onClick={async () => {
																										void await supabase.rpc("friend_request_do_with", {
																											from_user: friendRequest.id,
																											accept_request: false
																										});
																										
																										deleteListing();
																									}}
																								>
																									<PersonAddDisabled/>
																								</IconButton>
																							</Tooltip>
																							<Tooltip title={t("user_profile.friend_requests.tooltip.accept")}>
																								<IconButton
																									edge="end"
																									aria-label={t("user_profile.friend_requests.tooltip.accept")}
																									color="success"
																									onClick={async () => {
																										void await supabase.rpc("friend_request_do_with", {
																											from_user: friendRequest.id,
																											accept_request: true
																										});
																										
																										deleteListing();
																									}}
																								>
																									<HowToReg/>
																								</IconButton>
																							</Tooltip>
																						</div>
																					}
																				>
																					<ListItemAvatar>
																						{
																							(friendRequest.avatar_url === null)
																								? <PersonIcon/>
																								: <Avatar src={friendRequest.avatar_url}/>
																						}
																					</ListItemAvatar>
																					<Tooltip title={t("user_profile.friend_requests.tooltip.user_id") + " " + friendRequest.display_name + ": " + friendRequest.id}>
																						<ListItemText primary={friendRequest.display_name ? friendRequest.display_name : friendRequest.id}/>
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
										</section>
									</Dialog.Panel>
								</Transition.Child>
							</div>
						</div>
					</Dialog>
				</Transition>
			</>
		);
	}
}
