import OpeningCreator from "@ui/opening/opening-creator";
import {Dialog, Transition} from "@headlessui/react";
import {Fragment, useState} from "react";

/**
 * Component that opens up the opening creator dialog
 * for authenticated users.
 *
 * @author frigvid
 * @created 2024-04-10
 * @return {JSX.Element} The StagesModal component.
 * @constructor
 */
export default function StagesCreateOpeningModal() {
	let [isOpen, setIsOpen] = useState(false);
	
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
					className="w-full bg-buttoncolor inline-block rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal"
				>
					Create an opening
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
								<Dialog.Panel className="w-[30rem] h-[44rem] transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
									<Dialog.Title
										as="h3"
										className="text-lg mb-3 text-center font-semibold leading-6 text-gray-900"
									>
										Create an opening!
									</Dialog.Title>
									<OpeningCreator/>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>
		</>
	);
}