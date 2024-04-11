"use client";

import editUserProfileSA from "@user/profile/actions/edit-user-profile-sa";
import {CountryRegionData} from "react-country-region-selector";
import NativeSelect from "@mui/material/NativeSelect";
import {Dialog, Transition} from "@headlessui/react";
import React, {Fragment, useState} from "react";
import Edit from "@mui/icons-material/Edit";
import {useRouter} from "next/navigation";
import Button from "@mui/material/Button";

/**
 * Type definition for the EditUserProfileModal component.
 */
interface EditUserProfileModalProps {
	avatar_url: string;
	display_name: string;
	about_me: string;
	nationality: string;
	visibility: boolean;
	visibility_friends: boolean;
}

/**
 * Modal for editing a user's user profile.
 *
 * @author frigvid
 * @created 2024-04-10
 * @constructor
 */
export default function EditUserProfileModal({
	avatar_url,
	display_name,
	about_me,
	nationality,
	visibility,
	visibility_friends
}: EditUserProfileModalProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [nation, setNation] = useState(nationality);
	const [avatarUrl, setAvatarUrl] = useState(avatar_url);
	const [displayName, setDisplayName] = useState(display_name);
	const [aboutMe, setAboutMe] = useState(about_me);
	const [visibilityStatus, setVisibilityStatus] = useState(String(visibility));
	const [visibilityFriendsStatus, setVisibilityFriendsStatus] = useState(String(visibility_friends));
	const router = useRouter();
	
	function closeModal() {
		setIsOpen(false);
	}
	
	/**
	 * This is a rather ugly hack. Essentially, it's trying to go up
	 * a level in the URL path hierarchy, however, it gets 404'd because
	 * there purposefully isn't a generic profile page.
	 *
	 * Instead of going back a step, and sending the user to a 404. It
	 * instead forces a reload of the page; which is what you'd want.
	 *
	 * I'm pretty sure this behavior is just a bug, as it only occurs
	 * when this function is called from within either the Transition,
	 * Dialog or button. And not if you call the regular closeModal
	 * function.
	 *
	 * FIXME: Don't use this mess.
	 */
	function closeModalWeirdly() {
		setIsOpen(false);
		router.push(".");
	}
	
	function openModal() {
		setIsOpen(true);
	}
	
	return (
		<>
			<div className="absolute">
				<Button
					variant="outlined"
					color="inherit"
					size="small"
					onClick={openModal}
				>
					<Edit fontSize="small"/>
				</Button>
			</div>
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
									className="xs:w-full xs:h-full lg:w-[40rem] lg:h-[52rem] transform overflow-hidden lg:rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
								>
									<Dialog.Title
										as="h3"
										className="text-lg mb-3 text-center font-semibold leading-6 text-gray-900"
									>
										Edit your profile
									</Dialog.Title>
									<div className="bg-white lg:max-w-[800px] lg:min-w-[500px] lg:m-5 lg:p-5 lg:pl-2 lg:pr-2">
										<form action={editUserProfileSA}>
											{/* Avatar. */}
											<div className="mb-4">
												<label
													className="block text-gray-700 text-sm font-bold mb-2"
													htmlFor="avatar_url">
													Avatar URL
												</label>
												<input
													className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
													type="url"
													name="avatar_url"
													placeholder="https://example.com/my-fancy-avatar"
													value={avatarUrl ? avatarUrl : ""}
													onChange={(e) => setAvatarUrl(e.target.value)}
												/>
											</div>
											{/* Display name. */}
											<div className="mb-3">
												<label
													className="block text-gray-700 text-sm font-bold mb-2"
													htmlFor="display_name"
												>
													Display name
												</label>
												<input
													className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
													type="text"
													name="display_name"
													placeholder="Fancy Name"
													value={displayName ? displayName : ""}
													onChange={(e) => setDisplayName(e.target.value)}
												/>
											</div>
											{/* About me. */}
											<div className="mb-3">
												<label
													className="block text-gray-700 text-sm font-bold mb-2"
													htmlFor="about_me"
												>
													About me
												</label>
												<textarea
													className="shadow appearance-none border rounded w-full h-48 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline whitespace-pre-wrap"
													name="about_me"
													placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
													value={aboutMe ? aboutMe : ""}
													onChange={(e) => setAboutMe(e.target.value)}
												/>
											</div>
											{/* Nationality. */}
											<div className="mb-3">
												<label
													className="block text-gray-700 text-sm font-bold mb-2"
													htmlFor="nationality"
												>
													Nationality
												</label>
												<div className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline">
													<NativeSelect
														name="nationality"
														className="w-full"
														defaultValue={nation}
														onChange={(e) => setNation(e.target.value)}
													>
														<option>Select Country</option>
														{CountryRegionData.map((region) => {
															return (
																<option
																	key={region[0] + region[1]}
																	value={region[1]}
																>
																	{region[0]}
																</option>
															)
														})}
													</NativeSelect>
												</div>
											</div>
											{/* Visibility. */}
											<div className="mb-3">
												<label
													className="block text-gray-700 text-sm font-bold mb-2"
													htmlFor="visibility"
												>
													Profile visibility
												</label>
												<div className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline">
													<NativeSelect
														name="visibility"
														className="w-full"
														defaultValue={visibilityStatus}
														/* Parse text to boolean. */
														onChange={(e) => setVisibilityStatus(JSON.parse(e.target.value))}
													>
														<option value="true">Yes, I want my profile to be visible to others</option>
														<option value="false">No, I do not want my profile to be visible to others</option>
													</NativeSelect>
												</div>
											</div>
											{/* Friend list visibility. */}
											<div className="mb-3">
												<label
													className="block text-gray-700 text-sm font-bold mb-2"
													htmlFor="visibility_friends_list"
												>
													Friend list visibility
												</label>
												<div className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline">
													<NativeSelect
														name="visibility_friends_list"
														className="w-full"
														defaultValue={visibilityFriendsStatus}
														/* Parse text to boolean. */
														onChange={(e) => setVisibilityFriendsStatus(JSON.parse(e.target.value))}
													>
														<option value="true">Yes, I want my friends list to be visible to others</option>
														<option value="false">No, I do not want my friends list to be visible to others</option>
													</NativeSelect>
												</div>
											</div>
											<div className="mb-2 pb-1 pt-1 text-center">
											{/* Albeit these were using bg-buttoncolor, I think it's more intuitive color-coding the buttons. */}
												<button
													className="bg-green-400 mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal"
													formAction={editUserProfileSA}
													onClick={closeModalWeirdly}
												>
													Save details
												</button>
											</div>
										</form>
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>
		</>
	);
}
