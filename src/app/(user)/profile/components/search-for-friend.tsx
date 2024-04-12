"use client";

import React, {Fragment, useEffect, useState} from "react";
import PersonAdd from "@mui/icons-material/PersonAdd";
import {Dialog, Transition} from "@headlessui/react";
import {createClient} from "@utils/supabase/client";
import {useTranslation} from "react-i18next";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";

/**
 * Modal for searching for users to add as friends.
 *
 * @author frigvid
 * @created 2024-04-12
 */
export default function SearchForFriend() {
	const supabase = createClient();
	const [friendRequestStatus, setFriendRequestStatus] = useState(null);
	const [searchTerm, setSearchTerm] = useState('');
	const [isOpen, setIsOpen] = useState(false);
	const [searchStatus, setSearchStatus] = useState(null);
	const [friendStatus, setFriendStatus] = useState(null);
	const [searchUser, setSearchUser] = useState(null);
	const [user, setUser] = useState(null);
	const {t} = useTranslation();
	
	useEffect(() => {
		if (searchTerm) {
			/**
			 * Fetches the currently logged-in user.
			 *
			 * @return The currently logged-in user, once resolved.
			 */
			const fetchUser = async (): Promise<void> => {
				const {data: {user}, error} = await supabase.auth.getUser();
				
				if (error) {
					console.error("Getting currently logged in user failed!", error);
				} else {
					setUser(user);
				}
			}
			
			/**
			 * Fetches a user based on the search term.
			 *
			 * @return The user that matches the search term, once resolved.
			 */
			const fetchSearchUser = async (): Promise<void> => {
				const {data, error} = await supabase.rpc("search_user", {search_term: searchTerm});
				
				if (error) {
					//console.error("Error fetching user:", error);
					setSearchStatus(false);
				} else {
					setSearchStatus(true);
					setSearchUser(data.pop());
				}
			};
			
			void fetchUser();
			void fetchSearchUser();
		} else {
			setSearchUser(null);
		}
	}, [searchTerm, supabase]);
	
	/**
	 * Fetches the friend status of the search user.
	 *
	 * This is in its own useEffect clause to ensure
	 * it actually gets the search user before trying to
	 * fetch the friend status.
	 */
	useEffect(() => {
		if (searchUser) {
			const fetchFriendRequestStatus = async () => {
				const {data, error} = await supabase.rpc("friend_request_status", {other_user: searchUser.id});
				
				if (error) {
					console.error("Error fetching friend request status:", error);
				} else {
					setFriendRequestStatus(data);
				}
			}
			
			void fetchFriendRequestStatus();
		}
	}, [searchUser, supabase]);
	
	/**
	 * Check if the authenticated user and the user they're searching for
	 * are already friends.
	 */
	useEffect(() => {
		if (searchUser) {
			const fetchFriendStatus = async () => {
				const {data, error} = await supabase.rpc("friend_is_friend", {other_user: searchUser.id});
				
				if (error) {
					console.error("Error fetching friend status:", error);
				} else {
					setFriendStatus(data);
				}
			}
			
			void fetchFriendStatus();
		}
	}, [searchUser, supabase]);
	
	function closeModal() {
		setIsOpen(false);
	}
	
	function openModal() {
		setIsOpen(true);
	}
	
	return (
		<>
			<Tooltip title={t("user_profile.search_users.tooltip.button")}>
				<Button
					variant="outlined"
					color="inherit"
					size="small"
					onClick={openModal}
				>
					<PersonAdd fontSize="small"/>
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
									className="xs:w-full xs:h-full lg:w-[40rem] lg:h-[40rem] transform overflow-hidden lg:rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
								>
									<Dialog.Title
										as="h3"
										className="text-lg mb-3 text-center font-semibold leading-6 text-gray-900"
									>
										{t("user_profile.search_users.label")}
									</Dialog.Title>
									<section className="flex justify-center items-center flex-col space-y-4">
										<section className="max-w-md text-justify space-y-4 space-x-18 text-lg">
											<p>
												<span>{t("user_profile.search_users.info.part1")} <strong>{t("user_profile.search_users.info.part2")}</strong></span>
												<span> {t("user_profile.search_users.info.part3")},</span>
												<span> {t("user_profile.search_users.info.part4")} <code>/profile/<strong>00ba54a6-c585-4871-905e-7d53262f05c1</strong></code></span>
											</p>
										</section>
										<input
											id="search-user"
											type="text"
											placeholder={t("user_profile.search_users.search.hint")}
											className="border-2 w-[28rem] h-12 text-center bg-foreground"
											value={searchTerm}
											onChange={(e) => {
												setSearchTerm(e.target.value);
												if (e.target.value === '') {
													setSearchStatus(null)
												}
											}}
										/>
										<div
											className={`border-2 ${
												(searchStatus !== null)
													? ((searchStatus)
														? 'border-green-500'
														: 'border-red-500')
													: ''} w-[28rem] h-[20rem] flex justify-center items-center bg-foreground`}
										>
											{
												(searchStatus !== true && searchStatus !== null)
													? <p className="font-bold text-[2rem] uppercase underline decoration-red-500 underline-offset-4">{t("user_profile.search_users.search.user_not_found")}</p>
													: (
														<>
															{searchUser && (
																<div className="flex flex-col items-center space-y-4">
																	<div>
																		<Avatar src={searchUser.avatar_url} sx={{
																			width: 96,
																			height: 96
																		}}/>
																	</div>
																	<div>
																		<Tooltip title={t("user_profile.generics.fragment.user_id") + " " + searchUser.id}>
																			<h2 className="text-center">{searchUser.display_name}</h2>
																		</Tooltip>
																	</div>
																	<div>
																		{
																			(user && user.id === searchUser.id)
																				? <p className="border-2 border-red-500 p-2">{t("user_profile.search_users.search.befriend_self")}</p>
																				: ((friendRequestStatus === 2)
																					? <p className="border-2 border-orange-500 p-2">{t("user_profile.search_users.search.request_sent")}</p>
																					: (friendStatus)
																						? <p className="border-2 border-green-500 p-2">{t("user_profile.search_users.search.already_friends")}</p>
																						: (
																						<button
																							className="bg-buttoncolor inline-block rounded px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-danger"
																							onClick={async () => {
																								const {error} = await supabase.rpc("friend_request_send", {other_user: searchUser.id})
																								
																								if (error) {
																									console.error('Error sending friend request:', error);
																								} else {
																									setFriendRequestStatus(2);
																								}
																							}}
																						>
																							{t("user_profile.search_users.search.button")}
																						</button>
																					)
																				)
																		}
																	</div>
																</div>
															)}
														</>
													)
											}
										</div>
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
