"use client";

import React, {useState, useEffect, Fragment} from "react";
import {Dialog, Transition} from "@headlessui/react";
import {useTranslation} from "react-i18next";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import OpenInBrowserIcon from "@mui/icons-material/OpenInBrowser";
import ProtectClientContent from "@auth/components/protect-client-content";
import DeleteIcon from "@mui/icons-material/Delete";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import PersonIcon from "@mui/icons-material/Person";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import PersonAddDisabled from "@mui/icons-material/PersonAddDisabled";
import HowToReg from "@mui/icons-material/HowToReg";
import {createClient} from "@utils/supabase/client";
import Link from "next/link";
import {useUser} from "@auth/actions/useUser";

/**
 * The repertoire modal, letting users view which openings is in it,
 * remove openings from it and add new ones, as well as delete the
 * repertoire and practice against it.
 *
 * TODO: Implement opening removal.
 * TODO: Implement repertoire editing.
 * FIXME: Investigate why some openings' CSS don't act the same as others,
 * 		 despite not seeming to have any clear similarity between each
 * 		 other. Note this regards specifically "Test" and a repertoire
 * 		 with just 1 opening in it.
 *
 * @author frigvid
 * @created 2024-04-16
 * @params repertoire The repertoire that is being viewed/edited.
 * @returns The modal, with a button to open it with.
 */
export default function RepertoireModal({repertoire}) {
	const supabase = createClient();
	const {t} = useTranslation();
	let [isOpen, setIsOpen] = useState(false);
	const [openings, setOpenings] = useState([]);
	const user = useUser();
	
	/**
	 * Gets all openings from the repertoire, saving them in an
	 * intermediate step, before finally saving it them state.
	 *
	 * @author frigvid
	 * @created 2024-04-16
	 */
	useEffect(() => {
		const fetchOpenings = async () => {
			let intermediate = [];
			
			for (let i = 0; i < repertoire.openings.length; i++) {
				const {data, error} = await supabase
					.from('openings')
					.select('id, created_by, pgn, title, description')
					.eq('id', repertoire.openings[i]);
				
				if (error) {
					console.error("Something went wrong while fetching openings.", error);
				} else {
					intermediate[i] = data;
				}
			}
			
			setOpenings(intermediate);
		}
		
		void fetchOpenings();
	}, [isOpen, repertoire.openings, supabase]);
	
	/**
	 * Closes the modal.
	 *
	 * @author frigvid
	 * @created 2024-04-16
	 */
	function closeModal() {
		setIsOpen(false)
	}
	
	/**
	 * Opens the modal.
	 *
	 * @author frigvid
	 * @created 2024-04-16
	 */
	function openModal() {
		setIsOpen(true)
	}
	
	return (
		<>
			<div className="inset-0 flex items-center justify-center">
				<button
					type="button"
					onClick={openModal}
					className="w-full bg-buttoncolor inline-block rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal"
				>
					Read more
				</button>
			</div>
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
								<Dialog.Panel className="flex flex-col justify-between space-y-2 h-[35rem] top-10 lg:top-0 w-full md:w-[20rem] lg:w-[30rem] lg:h-[40rem] transform overflow-x-hidden overflow-y-scroll lg:no-scrollbar rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
									<div className="self-start">
										<Dialog.Title
											as="h3"
											className=" text-lg mb-3 text-center font-semibold leading-6 text-gray-900"
										>
											{repertoire.title}
										</Dialog.Title>
										<section className="text-center">
											<p>{repertoire.description}</p>
										</section>
										<section>
											<h2 className="font-semibold text-center">Openings in this repertoire</h2>
											<Paper style={{overflow: "auto"}}>
												{
													/**
													 * This is warning about not liking an "unknown" type. It's not
													 * a problem, just ignore it. It's just ESLint being ESLint.
													 */
													openings.map((opening) => {
														return (
															<Accordion key={opening[0].id}>
																<AccordionSummary
																	expandIcon={<ArrowDownwardIcon/>}
																	aria-controls="panel1a-content"
																	id="panel1a-header"
																>
																	<Typography>{opening[0].title}</Typography>
																</AccordionSummary>
																<AccordionDetails>
																	<Typography>
																		{opening[0].description}
																	</Typography>
																	{/* TODO: Implement these buttons. */}
																	<div className="flex flex-row justify-between">
																		<Tooltip title="Remove opening from this repertoire">
																			<IconButton aria-label="Remove opening from this repertoire">
																				<DeleteIcon color="error"/>
																			</IconButton>
																		</Tooltip>
																		<Tooltip title="Open in modal">
																			<IconButton aria-label="Open in modal">
																				<OpenInBrowserIcon/>
																			</IconButton>
																		</Tooltip>
																	</div>
																</AccordionDetails>
															</Accordion>
														)
													})
												}
											</Paper>
										</section>
									</div>
									<div className="self-end sticky bottom-0 w-full flex flex-row justify-between mb-4">
										<div>
											{
												(user?.id !== repertoire.usr)
													? null
													: (
														<Tooltip title={t("chess.repertoire.groups.delete.tooltip")}>
															<IconButton
																size="small"
																onClick={async () => {
																	const {error} = await supabase
																		.from('repertoire')
																		.delete()
																		.eq('id', repertoire.id);
																	
																	if (error) {
																		console.error("Something went wrong when deleting repertoire!", error);
																	} else {
																		setIsOpen(false);
																	}
																}}
															>
																<DeleteIcon color="error"/>
															</IconButton>
														</Tooltip>
													)
											}
										</div>
										<div>
											<Link
												className="w-full inline-flex justify-center rounded-md border border-transparent bg-buttoncolor px-4 py-2 text-sm font-medium text-black hover:text-white hover:bg-[#9c8064] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
												href={`/chess/train/${repertoire.id}`}
											>
												{t("chess.repertoire.groups.train")}
											</Link>
										</div>
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
