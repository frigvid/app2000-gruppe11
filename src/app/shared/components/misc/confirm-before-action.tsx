"use client";

import {Dialog, DialogTitle, DialogContent, DialogActions, Button} from "@mui/material";
import {useTranslation} from "react-i18next";
import React, {useState} from "react";

/**
 * A simple component that asks for confirmation before
 * executing an action.
 *
 * @author frigvid
 * @created 2024-04-19
 * @param children The children to wrap the confirmation around.
 * @param confirmMessage The message to display in the confirmation dialog.
 * @param onConfirm The function to execute when the user confirms the action.
 * 					  Both asynchronicity and synchronicity are supported.
 */
const ConfirmBeforeAction = ({
	children,
	confirmMessage,
	onConfirm
}) => {
	const {t} = useTranslation();
	const [open, setOpen] = useState(false);
	
	/**
	 * Handles the action, mostly just opening the dialog.
	 *
	 * @author frigvid
	 * @created 2024-04-19
	 * @param event The event.
	 */
	const handleAction = (event: any) => {
		event.preventDefault();
		setOpen(true);
	};
	
	/**
	 * Closes the dialog.
	 *
	 * @author frigvid
	 * @created 2024-04-19
	 */
	const handleClose = () => {
		setOpen(false);
	};
	
	/**
	 * Confirms the action.
	 *
	 * @author frigvid
	 * @created 2024-04-19
	 */
	const handleConfirm = () => {
		onConfirm();
		setOpen(false);
	};
	
	const childrenWithProps = React.cloneElement(children, {onClick: handleAction});
	
	return (
		<>
			{childrenWithProps}
			<Dialog
				open={open}
				onClose={handleClose}
			>
				<DialogTitle>
					{t("actions.confirm.title")}
				</DialogTitle>
				<DialogContent>
					{confirmMessage}
				</DialogContent>
				<DialogActions className="space-x-4">
					<Button onClick={handleConfirm} color="success">
						{t("actions.confirm.yes")}
					</Button>
					<Button onClick={handleClose} color="error">
						{t("actions.confirm.no")}
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

export default ConfirmBeforeAction;
