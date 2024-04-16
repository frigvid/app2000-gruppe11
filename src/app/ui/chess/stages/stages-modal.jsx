import StagesChessboardThumbnail from "@ui/chess/stages/stages-chessboard-thumbnail";
import {Dialog, Transition} from "@headlessui/react";
import {Fragment, useEffect, useState} from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import {createClient} from "@utils/supabase/client";
import IconButton from "@mui/material/IconButton";
import {useUser} from "@auth/actions/useUser";
import {useTranslation} from "react-i18next";
import Tooltip from "@mui/material/Tooltip";
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
	const [isOpen, setIsOpen] = useState(false);
	const user = useUser();
	
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
	 * Closes the modal.
	 *
	 * @author qwertyfyr
	 * @created 2024-04-02
	 */
	function closeModal() {
		setIsOpen(false)
	}
	
	/**
	 * Closes the modal.
	 *
	 * @author qwertyfyr
	 * @created 2024-04-02
	 */
	function openModal() {
		setIsOpen(true)
	}
	
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
									<Dialog.Panel className="w-[60rem] h-[40rem] transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all relative">
										<Dialog.Title
											as="h3"
											className="text-lg font-medium leading-6 text-gray-900"
										>
											{title}
										</Dialog.Title>
										<div className="absolute top-0 right-0 mr-4 mt-4">
											{
												(user?.id !== created_by)
													? (!isAdmin)
														? null
														: (
															deleteOpening()
														)
													: (
														deleteOpening()
													)
											}
										</div>
										<div className="mt-2">
											<p className="text-sm text-gray-500">
												{
													(details !== null)
														? ((details !== "")
															? details.split('\r\n').map((line, i) => <span key={i}>{line}<br/></span>)
															: null)
														: null
												}
											</p>
										</div>
										<StagesChessboardThumbnail pgn={pgn} width={300}/>
										<div className="mt-4">
											<Link
												className="inline-flex justify-center rounded-md border border-transparent bg-buttoncolor px-4 py-2 text-sm font-medium text-black hover:text-white hover:bg-[#9c8064] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
												href={`/chess/train/${id}`}
											>
												{t("chess.stages.practice")} &apos;{title}&apos;!
											</Link>
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
