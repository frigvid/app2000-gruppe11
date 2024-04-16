"use client";

import editUserProfileSA from "@user/profile/[id]/actions/edit-user-profile-sa";
import {CountryRegionData} from "react-country-region-selector";
import NativeSelect from "@mui/material/NativeSelect";
import {Dialog, Transition} from "@headlessui/react";
import React, {Fragment, useState} from "react";
import {useTranslation} from "react-i18next";
import Tooltip from "@mui/material/Tooltip";
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
 * Modal for editing a user's user profile, and some
 * options surrounding that.
 *
 * @author frigvid
 * @created 2024-04-10
 */
export default function UserProfileEditor({
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
	const {t} = useTranslation();
	
	function closeModal() {
		setIsOpen(false);
	}
	
	function openModal() {
		setIsOpen(true);
	}
	
	return (
		<>
			<Tooltip title={t("user_profile.editor.tooltip.button")}>
				<Button
					variant="outlined"
					color="inherit"
					size="small"
					onClick={openModal}
				>
					<Edit fontSize="small"/>
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
									className="xs:w-full xs:h-full lg:w-[40rem] lg:h-[52rem] transform overflow-x-hidden overflow-y-scroll lg:no-scrollbar lg:rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
								>
									<Dialog.Title
										as="h3"
										className="text-lg mb-3 text-center font-semibold leading-6 text-gray-900"
									>
										{t("user_profile.editor.label")}
									</Dialog.Title>
									<div className="bg-white lg:max-w-[800px] lg:min-w-[500px] lg:m-5 lg:p-5 lg:pl-2 lg:pr-2">
										<form action={editUserProfileSA}>
											{/* Avatar. */}
											<div className="mb-4">
												<Tooltip title={t("user_profile.editor.avatar_url.tooltip")}>
													<label
														className="block text-gray-700 text-sm font-bold mb-2"
														htmlFor="avatar_url"
													>
														{t("user_profile.editor.avatar_url.label")}
													</label>
												</Tooltip>
												<input
													className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
													type="url"
													name="avatar_url"
													placeholder={t("user_profile.editor.avatar_url.placeholder")}
													value={avatarUrl ? avatarUrl : ""}
													onChange={(e) => setAvatarUrl(e.target.value)}
												/>
											</div>
											{/* Display name. */}
											<div className="mb-3">
												<Tooltip title={t("user_profile.editor.display_name.tooltip")}>
													<label
														className="block text-gray-700 text-sm font-bold mb-2"
														htmlFor="display_name"
													>
														{t("user_profile.editor.display_name.label")}
													</label>
												</Tooltip>
												<input
													className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
													type="text"
													name="display_name"
													placeholder={t("user_profile.editor.display_name.placeholder")}
													value={displayName ? displayName : ""}
													onChange={(e) => setDisplayName(e.target.value)}
												/>
											</div>
											{/* About me. */}
											<div className="mb-3">
												<Tooltip title={t("user_profile.editor.about_me.tooltip")}>
													<label
														className="block text-gray-700 text-sm font-bold mb-2"
														htmlFor="about_me"
													>
														{t("user_profile.editor.about_me.label")}
													</label>
												</Tooltip>
												<textarea
													className="shadow appearance-none border rounded w-full h-48 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline whitespace-pre-wrap"
													name="about_me"
													placeholder={t("user_profile.editor.about_me.placeholder")}
													value={aboutMe ? aboutMe : ""}
													onChange={(e) => setAboutMe(e.target.value)}
												/>
											</div>
											{/* Nationality. */}
											<div className="mb-3">
												<Tooltip title={t("user_profile.editor.nationality.tooltip")}>
													<label
														className="block text-gray-700 text-sm font-bold mb-2"
														htmlFor="nationality"
													>
														{t("user_profile.editor.nationality.label")}
													</label>
												</Tooltip>
												<div className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline">
													<NativeSelect
														name="nationality"
														className="w-full"
														defaultValue={nation}
														onChange={(e) => setNation(e.target.value)}
													>
														<option value="none">{t("user_profile.editor.nationality.default")}</option>
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
													{t("user_profile.editor.visibility.label")}
												</label>
												<div className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline">
													<NativeSelect
														name="visibility"
														className="w-full"
														defaultValue={visibilityStatus}
														/* Parse text to boolean. */
														onChange={(e) => setVisibilityStatus(JSON.parse(e.target.value))}
													>
														<option value="true">{t("user_profile.editor.visibility.option_true")}</option>
														<option value="false">{t("user_profile.editor.visibility.option_false")}</option>
													</NativeSelect>
												</div>
											</div>
											{/* Friend list visibility. */}
											<div className="mb-3">
												<label
													className="block text-gray-700 text-sm font-bold mb-2"
													htmlFor="visibility_friends_list"
												>
													{t("user_profile.editor.visibility_friends_list.label")}
												</label>
												<div className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline">
													<NativeSelect
														name="visibility_friends_list"
														className="w-full"
														defaultValue={visibilityFriendsStatus}
														/* Parse text to boolean. */
														onChange={(e) => setVisibilityFriendsStatus(JSON.parse(e.target.value))}
													>
														<option value="true">{t("user_profile.editor.visibility_friends_list.option_true")}</option>
														<option value="false">{t("user_profile.editor.visibility_friends_list.option_false")}</option>
													</NativeSelect>
												</div>
											</div>
											<div className="mb-2 pb-1 pt-1 text-center">
											{/* Albeit these were using bg-buttoncolor, I think it's more intuitive color-coding the buttons. */}
												<button
													className="bg-green-400 mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal"
													formAction={editUserProfileSA}
													onClick={closeModal}
												>
													{t("user_profile.editor.save.label")}
												</button>
												<span className="text-xs">{t("user_profile.editor.save.warning")}</span>
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
