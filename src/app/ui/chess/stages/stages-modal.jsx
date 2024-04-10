import {Dialog, Transition} from "@headlessui/react";
import {Fragment, useState} from "react";
import Link from "next/link";

/**
 * Component that creates a modal for the stages.
 *
 * @author qwertyfyr
 * @param title The title of the stage.
 * @param details The details of the stage.
 * @param id The id of the stage.
 * @return {JSX.Element} The StagesModal component.
 * @constructor
 */
export default function StagesModal({title, details, id}) {
	let [isOpen, setIsOpen] = useState(false)
	
	function closeModal() {
		setIsOpen(false)
	}
	
	function openModal() {
		setIsOpen(true)
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
								<Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
									<Dialog.Title
										as="h3"
										className="text-lg font-medium leading-6 text-gray-900"
									>
										{title}
									</Dialog.Title>
									<div className="mt-2">
										<p className="text-sm text-gray-500">
											{details}
										</p>
									</div>
									
									<div className="mt-4">
										<Link
											className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
											href={`/chess/train/${id}`}
										>
											Practice {title}!
										</Link>
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>
		</>
	)
}
