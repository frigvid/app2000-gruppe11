"use client";

import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import {createClient} from "@shared/utils/supabase/client";
import React, {useState, useEffect, Fragment} from "react";
import ListItemText from "@mui/material/ListItemText";
import {Dialog, Transition} from "@headlessui/react";
import DeleteIcon from "@mui/icons-material/Delete";
import {Checkbox, TextField} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Accordion from "@mui/material/Accordion";
import ListItem from "@mui/material/ListItem";
import {useUser} from "@auth/actions/useUser";
import {useTranslation} from "react-i18next";
import Tooltip from "@mui/material/Tooltip";
import Edit from "@mui/icons-material/Edit";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import Link from "next/link";

/**
 * The repertoire modal, letting users view which openings is in it,
 * remove openings from it and add new ones, as well as delete the
 * repertoire and practice against it.
 *
 * @author frigvid
 * @created 2024-04-16
 * @params repertoire The repertoire that is being viewed/edited.
 * @returns The modal, with a button to open it with.
 */
export default function RepertoireModal({repertoireObj}) {
	const supabase = createClient();
	const {t} = useTranslation();
	let [isOpen, setIsOpen] = useState(false);
	const [repertoire, setRepertoire] = useState(repertoireObj);
	const [allOpenings, setAllOpenings] = useState(null);
	const [openings, setOpenings] = useState([]);
	const [checkedOpenings, setCheckedOpenings] = useState([]);
	const [isEditing, setIsEditing] = useState(false);
	const [title, setTitle] = useState((repertoire.title === null) ? "" : repertoire.title);
	const [description, setDescription] = useState((repertoire.description === null) ? "" : repertoire.description);
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
	 * Fetches all openings from the database.
	 *
	 * @author  frigvid
	 * @created 2024-04-18
	 */
	useEffect(() => {
		async function getOpenings() {
			const {data, error} = await supabase
				.from('openings')
				.select('id, created_by, title, description, pgn');
			
			if (error) {
				console.error("Something went wrong while getting openings!", error);
			} else {
				setAllOpenings(data);
			}
		}
		
		void getOpenings();
	}, [supabase]);
	
	/**
	 * This useEffect handles realtime INSERTs and DELETEs
	 * from the public.repertoire table.
	 *
	 * See {@link @/app/chess/stages/components/StagesOpenings}
	 * for some additional details.
	 *
	 * @author frigvid
	 * @created 2024-04-18
	 * @see https://supabase.com/docs/guides/realtime
	 */
	useEffect(() => {
		const repertoire = supabase
			.channel('repertoire_obj')
			.on('postgres_changes', {
				event: 'UPDATE',
				schema: 'public',
				table: 'repertoire'
			}, async (payload) => {
				setRepertoire(payload.new);
				setCheckedOpenings(payload.new.openings);
			})
			.subscribe();
		
		return () => {
			void supabase.removeChannel(repertoire);
		}
	}, [supabase]);
	
	/**
	 * Closes the modal.
	 *
	 * @author frigvid
	 * @created 2024-04-16
	 */
	function closeModal() {
		setIsOpen(false);
		setIsEditing(false);
		setOpenings([]);
	}
	
	/**
	 * Opens the modal.
	 *
	 * @author frigvid
	 * @created 2024-04-16
	 */
	function openModal() {
		setIsOpen(true);
		setCheckedOpenings(repertoire.openings);
	}
	
	/**
	 * Checks if an opening is in the repertoire.
	 *
	 * @author frigvid
	 * @created 2024-04-18
	 * @return {boolean} If the opening is in the repertoire or not.
	 */
	function isChecked(allOpeningID) {
		return checkedOpenings.includes(allOpeningID);
	}
	
	/**
	 * The content of the repertoire modal.
	 *
	 * @author frigvid
	 * @created 2024-04-18
	 * @return {Element} The content of the modal.
	 */
	function content() {
		return (
			<>
				<section className="self-start w-full">
					<Dialog.Title
						as="h3"
						className=" text-lg mb-3 text-center font-semibold leading-6 text-gray-900"
					>
						{repertoire.title}
					</Dialog.Title>
					<div className="text-center">
						<p>{repertoire.description}</p>
					</div>
					<div>
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
												<div className="flex flex-row justify-end">
													<Tooltip title="Remove opening from this repertoire">
														<IconButton
															aria-label="Remove opening from this repertoire"
															onClick={async () => {
																const newOpenings = repertoire.openings.filter(id => id !== opening[0].id);
																
																const {error} = await supabase
																	.from('repertoire')
																	.update({
																		openings: newOpenings
																	})
																	.eq('id', repertoire.id);
																
																if (error) {
																	console.error("Something went wrong when removing opening from repertoire!", error);
																} else {
																	setRepertoire({...repertoire, openings: newOpenings});
																}
															}}
														>
															<DeleteIcon color="error"/>
														</IconButton>
													</Tooltip>
												</div>
											</AccordionDetails>
										</Accordion>
									)
								})
							}
						</Paper>
					</div>
				</section>
				<section className="self-end sticky bottom-0 w-full flex flex-row justify-between mb-4">
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
				</section>
			</>
		)
	}
	
	/**
	 * The editor for the repertoire.
	 *
	 * @author frigvid
	 * @created 2024-04-18
	 * @return {Element} The editor for the repertoire.
	 */
	function editor() {
		return (
			<div className="h-full">
				<div className="space-y-2">
					<h2 className="font-semibold text-center">Editing repertoire</h2>
					<div>
						<label>Edit title</label>
						<TextField
							className="w-full"
							variant="outlined"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
						/>
					</div>
					<div>
						<label>Edit description</label>
						<TextField
							className="w-full"
							variant="outlined"
							maxRows={8}
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							multiline
							inputProps={{style: {height: "8rem", maxHeight: "8rem", overflow: "auto"}}}
						/>
					</div>
					<div>
						<label>Select openings</label>
						<Paper style={{maxHeight: 130, overflow: 'auto'}}>
							<List>
								{
									allOpenings.map((opening) => {
										return (
											[
												<ListItem
													key={opening.id}
													secondaryAction={
														
														<Tooltip title={t("user_profile.friend_list.tooltip.remove_friend")}>
															<Checkbox
																checked={isChecked(opening.id)}
																onChange={async () => {
																	if (isChecked(opening.id)) {
																		setCheckedOpenings(checkedOpenings.filter(id => id !== opening.id));
																	} else {
																		setCheckedOpenings([...checkedOpenings, opening.id]);
																	}
																}}
															>
																<DeleteIcon/>
															</Checkbox>
														</Tooltip>
													}
												>
													<Tooltip title={opening.id}>
														<ListItemText primary={opening.title}/>
													</Tooltip>
												</ListItem>,
												<Divider key={self.crypto.randomUUID()}/>
											]
										)
									})
								}
							</List>
						</Paper>
					</div>
				</div>
				<div className="absolute bottom-0 right-0 left-0 mb-4 mr-4 ml-4">
					<button
						type="button"
						className="inline-flex w-full justify-center rounded-md border border-transparent bg-buttoncolor px-4 py-2 text-sm font-medium text-black hover:text-white hover:bg-[#9c8064] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
						onClick={async () => {
							const {error} = await supabase
								.from('repertoire')
								.update({
									title: title,
									description: description,
									openings: checkedOpenings
								})
								.eq('id', repertoire.id);
							
							if (error) {
								console.error("Something went wrong when updating repertoire!", error);
							} else {
								setIsEditing(false);
							}
						}}
					>
						Save details
					</button>
				</div>
			</div>
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
									<section className="absolute top-0 right-0 mr-4 mt-4">
										<Tooltip title="Edit repertoire">
											<IconButton
												onClick={() => {
													setIsEditing(!isEditing);
												}}
											>
												<Edit color="primary"/>
											</IconButton>
										</Tooltip>
									</section>
									{
										(isEditing)
											? editor()
											: content()
									}
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>
		</>
	);
}
