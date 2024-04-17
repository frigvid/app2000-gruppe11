import StagesChessboardThumbnail from "@/app/(game)/chess/stages/components/stages-chessboard-thumbnail";
import {createClient} from "@shared/utils/supabase/client";
import {Dialog, Transition} from "@headlessui/react";
import {Fragment, useEffect, useState} from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import SaveIcon from '@mui/icons-material/Save';
import {useUser} from "@auth/actions/useUser";
import {useTranslation} from "react-i18next";
import Tooltip from "@mui/material/Tooltip";
import Edit from "@mui/icons-material/Edit";
import {TextField} from "@mui/material";
import Box from "@mui/material/Box";
import Link from "next/link";

/**
 * Component that creates a modal for the stages.
 *
 * @author frigvid, qwertyfyr
 * @param created_by The user the stage was created by.
 * @param title The title of the stage.
 * @param details The details of the stage.
 * @param id The id of the stage.
 * @param pgn The moveset of the stage.
 * @return {JSX.Element} The StagesModal component.
 * @constructor
 */
export default function StagesModal({created_by, title, details, id, pgn}) {
	const supabase = createClient();
	const {t} = useTranslation();
	const [isAdmin, setIsAdmin] = useState(false);
	const [isEditingTitle, setIsEditingTitle] = useState(false);
	const [isEditingDescription, setIsEditingDescription] = useState(false);
	const [editedTitle, setEditedTitle] = useState(title);
	const [editedDescription, setEditedDescription] = useState(details);
	const [isOpen, setIsOpen] = useState(false);
	const user = useUser();
	
	/**
	 * Closes the modal.
	 *
	 * @author qwertyfyr
	 * @contributor frigvid
	 * @created 2024-04-02
	 */
	function closeModal() {
		setIsOpen(false);
		setIsEditingTitle(false);
		setIsEditingDescription(false);
		setEditedTitle(title);
		setEditedDescription(details);
	}
	
	/**
	 * Closes the modal.
	 *
	 * @author qwertyfyr
	 * @created 2024-04-02
	 */
	function openModal() {
		setIsOpen(true);
	}
	
	/**
	 * Checks if the authenticated user is an administrator or not.
	 *
	 * @author frigvid
	 * @created 2024-04-16
	 */
	useEffect(() => {
		const fetchAdminStatus = async () => {
			const {data, error} = await supabase.rpc("admin_is_admin");
			
			if (error) {
				console.error("Something went wrong while trying to check administrator status!", error);
			} else {
				setIsAdmin(data);
			}
		}
		
		void fetchAdminStatus();
	}, [supabase]);
	
	/**
	 * Shared function that returns the delete button for authenticated
	 * users who are the creators of an opening, and for administrators.
	 *
	 * @author frigvid
	 * @created 2024-04-16
	 * @return {Element} The opening delete button.
	 */
	function deleteOpening() {
		return (
			<Tooltip title={t("chess.stages.delete")}>
				<IconButton
					size="small"
					sx={{ml: 2}}
					onClick={async () => {
						void await supabase.rpc("opening_delete", {opn_id: id});
						setIsOpen(false);
					}}
				>
					<DeleteIcon color="error"/>
				</IconButton>
			</Tooltip>
		)
	}
	
	return (
		<>
			<div className="inset-0 flex items-center justify-center">
				<button
					type="button"
					onClick={openModal}
					className="rounded-md bg-black/20 px-4 py-2 text-sm font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
				>
					{t("chess.stages.read_more")}
				</button>
			</div>
			{
				<Transition appear show={isOpen} as={Fragment}>
					<Dialog as="div" className="relative z-10" onClose={closeModal}>
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0"
							enterTo="opacity-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100"
							leaveTo="opacity-0"
						>
							<div className="fixed inset-0 bg-black/25"/>
						</Transition.Child>
						
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
									<Dialog.Panel className="w-full space-y-2 h-[35rem] top-10 lg:top-0 lg:w-[60rem] lg:h-[40rem] transform overflow-x-hidden overflow-y-scroll lg:no-scrollbar rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all relative">
										<div className="lg:flex lg:flex-row lg:justify-between">
											<div className="space-y-2 lg:absolute lg:top-0 lg:left-0 lg:ml-[3rem] lg:mt-[3rem]">
												<div>
													{
														(
															user?.id === created_by ||
															(isAdmin && created_by === null)
														) &&
														<Box className="flex items-center space-x-2">
															{
																isEditingTitle
																	? <Tooltip title={t("chess.stages.title.save")}>
																		<IconButton
																			onClick={async () => {
																				const {error} = await supabase
																					.from('openings')
																					.update({
																						title: editedTitle
																					})
																					.eq('id', id);
																				
																				if (error) {
																					console.error("Something went wrong while trying to save title changes!", error);
																				} else {
																					setIsEditingTitle(false);
																				}
																			}}
																		>
																			<SaveIcon color="primary" style={{width: 15, height: 15}}/>
																		</IconButton>
																	</Tooltip>
																	: <Tooltip title={t("chess.stages.title.edit")}>
																		<IconButton
																			onClick={() => setIsEditingTitle(true)}
																		>
																			<Edit color="primary" style={{width: 15, height: 15}}/>
																		</IconButton>
																	</Tooltip>
															}
															{
																isEditingTitle
																	? <TextField
																		className="lg:w-[30rem]"
																		size="small"
																		value={editedTitle}
																		onChange={(e) => setEditedTitle(e.target.value)}
																	/>
																	: <Dialog.Title className="text-lg font-semibold leading-6 text-gray-900">{title}</Dialog.Title>
															}
														</Box>
													}
												</div>
												<div>
													{
														(
															user?.id === created_by ||
															(isAdmin && created_by === null)
														) &&
														<Box className="flex items-center space-x-2">
															{
																isEditingDescription
																	? <Tooltip title={t("chess.stages.desc.save")}>
																		<IconButton
																			onClick={async () => {
																				const {error} = await supabase
																					.from('openings')
																					.update({
																						description: editedDescription
																					})
																					.eq('id', id);
																				
																				if (error) {
																					console.error("Something went wrong while trying to save description changes!", error);
																				} else {
																					setIsEditingDescription(false);
																				}
																			}}
																		>
																			<SaveIcon color="primary" style={{width: 15, height: 15}}/>
																		</IconButton>
																	</Tooltip>
																	: <Tooltip title={t("chess.stages.desc.edit")}>
																		<IconButton
																			onClick={() => setIsEditingDescription(true)}
																		>
																			<Edit color="primary" style={{width: 15, height: 15}}/>
																		</IconButton>
																	</Tooltip>
															}
															{
																isEditingDescription
																	? <TextField
																		className="lg:w-[30rem]"
																		rows={4}
																		maxRows={10}
																		variant="outlined"
																		value={editedDescription}
																		onChange={(e) => setEditedDescription(e.target.value)}
																		multiline
																		inputProps={{style: {height: "14rem", maxHeight: "14rem", overflow: "auto"}}}
																	/>
																	: (
																		<div className="max-w-md">
																			<p className="text-sm text-gray-500">
																				{
																					(details !== null)
																						? ((details !== "")
																							? details.split(/\r?\n/).map((line, i) => <span key={i}>{line}<br/></span>)
																							: null)
																						: null
																				}
																			</p>
																		</div>
																	)
															}
														</Box>
													}
												</div>
											</div>
											<div className="lg:absolute lg:top-0 lg:right-0 lg:mr-[3rem] lg:mt-[3rem]">
												<StagesChessboardThumbnail pgn={pgn} width={300}/>
											</div>
										</div>
										<div className="flex flex-row justify-between">
											<div className="lg:absolute lg:bottom-0 lg:left-0 lg:ml-5 lg:mb-5">
												<Link
													className="inline-flex justify-center rounded-md border border-transparent bg-buttoncolor px-4 py-2 text-sm font-medium text-black hover:text-white hover:bg-[#9c8064] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
													href={`/chess/train/${id}`}
												>
													{t("chess.stages.practice")} &apos;{title}&apos;!
												</Link>
											</div>
											<div className="lg:absolute lg:bottom-0 lg:right-0 lg:mr-4 lg:mb-4">
												{
													(user?.id !== created_by)
														? (isAdmin)
															? deleteOpening()
															: null
														: deleteOpening()
												}
											</div>
										</div>
									</Dialog.Panel>
								</Transition.Child>
							</div>
						</div>
					</Dialog>
				</Transition>
			}
		</>
	)
}
