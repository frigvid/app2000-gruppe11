"use client";

import ConfirmBeforeAction from "@shared/components/misc/confirm-before-action";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import {createClient} from "@shared/utils/supabase/client";
import React, {useState, useEffect, Fragment} from "react";
import ListItemText from "@mui/material/ListItemText";
import {Dialog, Transition} from "@headlessui/react";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Accordion from "@mui/material/Accordion";
import ListItem from "@mui/material/ListItem";
import {useUser} from "@auth/actions/useUser";
import {useTranslation} from "react-i18next";
import Tooltip from "@mui/material/Tooltip";
import Edit from "@mui/icons-material/Edit";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import Link from "next/link";

/**
 * The prop types for the modal.
 *
 * @author frigvid
 * @created 2024-04-20
 */
interface NewsModalPropTypes {
	isAuthoring?: boolean;
	newsId?: number;
}

/**
 * The news modal.
 *
 * This modal is used to create and edit news items.
 *
 * @author frigvid
 * @created 2024-04-20
 * @param isAuthoring Whether the user is authoring or not.
 * @param newsId The ID of the news item to edit.
 * @return The news modal.
 */
export default function NewsModal({
	isAuthoring = false,
	newsId = null
}: NewsModalPropTypes) {
	const supabase = createClient();
	const {t} = useTranslation();
	const [title, setTitle] = useState("");
	const [summary, setSummary] = useState("");
	const [content, setContent] = useState("");
	const [isOpen, setIsOpen] = useState(false);
	const [isAdmin, setIsAdmin] = useState(false);
	const user = useUser();
	
	/**
	 * Checks if the authenticated user is an administrator or not.
	 *
	 * @author frigvid
	 * @created 2024-04-20
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
	 * Fetches the news item if a news ID is provided.
	 *
	 * @author frigvid
	 * @created 2024-04-20
	 */
	useEffect(() => {
		if (newsId) {
			const fetchNews = async () => {
				const {data, error} = await supabase
					.from('news')
					.select('*')
					.eq('id', newsId);
				
				if (error) {
					console.error("Error fetching news!", error);
				} else {
					setTitle(data[0].title);
					setSummary(data[0].summary);
					setContent(data[0].content);
				}
			}
			
			void fetchNews();
		}
	}, [newsId, supabase]);
	
	/**
	 * Closes the modal.
	 *
	 * @author frigvid
	 * @created 2024-04-16
	 */
	function closeModal() {
		setIsOpen(false);
	}
	
	/**
	 * Opens the modal.
	 *
	 * @author frigvid
	 * @created 2024-04-16
	 */
	function openModal() {
		setIsOpen(true);
	}
	
	/**
	 * The creator button, used if isAuthoring is true.
	 *
	 * @author frigvid
	 * @created 2024-04-20
	 */
	function creatorButton() {
		return (
			<div className="flex flex-col space-y-2 mt-4 mb-4">
				<h2 className="text-center">
					{t("news.creator.info.label")}
				</h2>
				<button
					type="button"
					onClick={openModal}
					className="bg-buttoncolor hover:bg-[#976646] hover:text-white inline-block rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal"
				>
					{t("news.creator.info.button")}
				</button>
			</div>
		)
	}
	
	/**
	 * The creator content, used if isAuthoring is true.
	 *
	 * @author frigvid
	 * @created 2024-04-20
	 */
	function creatorContent() {
		return (
			<>
				<div>
					<h2 className="text-center font-semibold text-2xl">
						{t("news.creator.modal.label")}
					</h2>
					<div className="flex flex-col w-full space-y-2">
						<Tooltip title={t("news.creator.modal.title.tooltip")}>
							<label className="font-medium">
								{t("news.creator.modal.title.label")}<span className="text-red-500">*</span>
							</label>
						</Tooltip>
						<input
							type="text"
							placeholder={t("news.creator.modal.title.placeholder")}
							className="border border-gray-300 p-2 rounded"
							onChange={(e) => setTitle(e.target.value)}
						/>
						<Tooltip title={t("news.creator.modal.summary.tooltip")}>
							<label className="font-medium">
								{t("news.creator.modal.summary.label")}<span className="text-red-500">*</span>
							</label>
						</Tooltip>
						<TextField
							placeholder={t("news.creator.modal.summary.placeholder")}
							className="border border-gray-300 p-2 rounded h-24 whitespace-pre-wrap"
							multiline
							rows={2.5}
							onChange={(e) => setSummary(e.target.value)}
						/>
						<label className="font-medium">
							{t("news.creator.modal.content.label")}
						</label>
						<TextField
							placeholder={t("news.creator.modal.content.placeholder")}
							className="w-full border border-gray-300 p-2 rounded h-24 whitespace-pre-wrap"
							multiline
							rows={9}
							variant="outlined"
							inputProps={{style: {overflow: "auto"}}}
							onChange={(e) => setContent(e.target.value)}
						/>
					</div>
				</div>
				<div>
					<ConfirmBeforeAction
						confirmMessage={t("news.creator.modal.save.confirmation")}
						onConfirm={async () => {
							const {error} = await supabase
								.from('news')
								.insert([
									{
										title: title,
										summary: summary,
										content: content,
										created_by: user.id
									}
								]);
							
							if (error) {
								console.error("Error creating news item!", error);
							} else {
								closeModal();
							}
						}}
					>
						<button
							className="w-full bg-buttoncolor hover:bg-[#9c8064] hover:text-white mb-3 inline-block rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal"
						>
							{t("news.creator.modal.save.button")}
						</button>
					</ConfirmBeforeAction>
				</div>
			</>
		)
	}
	
	/**
	 * The editor button, used if isAuthoring is false.
	 *
	 * @author frigvid
	 * @created 2024-04-20
	 */
	function editorButton() {
		return (
			<Tooltip title={t("news.editor.info.tooltip")}>
				<IconButton
					onClick={() => {
						openModal();
					}}
				>
					<Edit color="primary"/>
				</IconButton>
			</Tooltip>
		)
	}
	
	/**
	 * The editor content, used if isAuthoring is false.
	 *
	 * @author frigvid
	 * @created 2024-04-20
	 */
	function editorContent() {
		return (
			<>
				<div>
					<h2 className="text-center font-semibold text-2xl">
						{t("news.editor.modal.label")}
					</h2>
					<div className="flex flex-col w-full space-y-2">
						<Tooltip title={t("news.editor.modal.title.tooltip")}>
							<label className="font-medium">
								{t("news.editor.modal.title.label")}<span className="text-red-500">*</span>
							</label>
						</Tooltip>
						<input
							type="text"
							placeholder={t("news.editor.modal.title.placeholder")}
							className="border border-gray-300 p-2 rounded"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
						/>
						<Tooltip title={t("news.editor.modal.summary.tooltip")}>
							<label className="font-medium">
								{t("news.editor.modal.summary.label")}<span className="text-red-500">*</span>
							</label>
						</Tooltip>
						<TextField
							placeholder={t("news.editor.modal.summary.placeholder")}
							className="border border-gray-300 p-2 rounded h-24 whitespace-pre-wrap"
							multiline
							rows={2.5}
							value={summary}
							onChange={(e) => setSummary(e.target.value)}
						/>
						<label className="font-medium">
							{t("news.editor.modal.content.label")}
						</label>
						<TextField
							placeholder={t("news.editor.modal.content.placeholder")}
							className="w-full border border-gray-300 p-2 rounded h-24 whitespace-pre-wrap"
							multiline
							rows={9}
							variant="outlined"
							inputProps={{style: {overflow: "auto"}}}
							value={content}
							onChange={(e) => setContent(e.target.value)}
						/>
					</div>
				</div>
				<div>
					<ConfirmBeforeAction
						confirmMessage={t("news.editor.modal.save.confirmation")}
						onConfirm={async () => {
							const {error} = await supabase
								.from('news')
								.update({
									title: title,
									summary: summary,
									content: content
								})
								.eq('id', newsId);
							
							if (error) {
								console.error("Error updating news item!", error);
							} else {
								closeModal();
							}
						}}
					>
						<button
							className="w-full bg-buttoncolor mb-3 inline-block rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal"
						>
							{t("news.editor.modal.save.button")}
						</button>
					</ConfirmBeforeAction>
				</div>
			</>
		)
	}
	
	return (
		<>
			<div className="inset-0 flex flex-col items-center justify-center">
				{
					(user && isAdmin)
						? (isAuthoring)
							? creatorButton()
							: editorButton()
						: null
				}
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
									{
										(isAuthoring)
											? creatorContent()
											: editorContent()
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
