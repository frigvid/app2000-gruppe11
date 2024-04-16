"use client";

import DialogContentText from "@mui/material/DialogContentText";
import {forwardRef, ReactElement, Ref, useState} from "react";
import {TransitionProps} from "@mui/material/transitions";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import {useTranslation} from "react-i18next";
import Tooltip from "@mui/material/Tooltip";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import Slide from "@mui/material/Slide";

/**
 * A transition component, which is a simple wrapper around the `Slide` component.
 *
 * @author frigvid
 * @created 2024-04-14
 * @param props The transition properties.
 * @param ref The reference.
 * @returns The slide component.
 * @note While `Slide` complains about missing its "children" props, it's really
 * 		not a problem. And, in fact, adding it is. Simply ignore that, it doesn't impact
 * 		building the project, nor add any instability.
 */
const Transition = forwardRef(function Transition(
	props: TransitionProps & {
		children: ReactElement<any, any>;
	},
	ref: Ref<unknown>,
) {
	return <Slide direction="up" ref={ref} {...props}/>;
});

/**
 * A simple pop-up ensuring the administrator really is sure about deleting
 * a user from the administrator dashboard.
 *
 * @author frigvid
 * @created 2024-04-14
 * @param id The user's ID.
 * @param display_name The user's display_name.
 * @param supabase The browser-context supabase client.
 * @param deleteListing The function to remove the user from the list afterward.
 */
export default function WarnBeforeDelete({id, display_name, supabase, deleteListing}) {
	const {t} = useTranslation();
	const [open, setOpen] = useState(false);
	
	/**
	 * Opens the modal.
	 *
	 * @author frigvid
	 * @created 2024-04-14
	 */
	const modalOpen = () => {
		setOpen(true);
	};
	
	/**
	 * Closes the modal.
	 *
	 * @author frigvid
	 * @created 2024-04-14
	 */
	const modalClose = () => {
		setOpen(false);
	};
	
	return (
		<>
			<Tooltip title={t("admin_dashboard.users.delete.tooltip")}>
				<IconButton
					edge="end"
					aria-label={t("admin_dashboard.users.delete.tooltip")}
					color="error"
					onClick={modalOpen}
				>
					<DeleteIcon/>
				</IconButton>
			</Tooltip>
			<Dialog
				open={open}
				TransitionComponent={Transition}
				keepMounted
				onClose={modalClose}
				aria-describedby="alert-dialog-slide-description"
			>
				<DialogTitle>{t("admin_dashboard.users.delete.label")} <strong>{display_name}</strong>?</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-slide-description">
						{t("admin_dashboard.users.delete.body")}
						<strong> {id}</strong>
						{/* Note that the space above is there for, well, spacing. */}
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<div className="space-x-10">
						<Button onClick={modalClose}>{t("admin_dashboard.users.delete.button.no")}</Button>
						<Button
							onClick={async () => {
								void await supabase.rpc("admin_delete_user", {
									user_to_delete: id
								});
							
								deleteListing();
								modalClose();
							}}
						>
							{t("admin_dashboard.users.delete.button.yes")}
						</Button>
					</div>
				</DialogActions>
			</Dialog>
		</>
	);
}
