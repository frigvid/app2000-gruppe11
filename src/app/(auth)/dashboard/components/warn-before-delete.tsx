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
import * as React from "react";

const Transition = forwardRef(function Transition(
	props: TransitionProps & {
		children: ReactElement<any, any>;
	},
	ref: Ref<unknown>,
) {
	return <Slide direction="up" ref={ref} {...props}/>;
});

export default function WarnBeforeDelete({id, display_name, supabase, deleteListing}) {
	const {t} = useTranslation();
	const [open, setOpen] = useState(false);
	
	const modalOpen = () => {
		setOpen(true);
	};
	
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
