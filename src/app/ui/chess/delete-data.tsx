import removeGamedata from "@utils/game/remove-gamedata";
import {useUser} from "@auth/actions/useUser";
import {useTranslation} from "react-i18next";

export default function DeleteData() {
	const user = useUser();
	const {t} = useTranslation();
	
	const deleteData = async () => {
		void removeGamedata(user.id);
	};
	
	return (
		<>
			<div className="flex items-center gap-4">
				<form action={deleteData}>
					<button
						className="bg-buttoncolor inline-block rounded px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-danger mt-4 hover:bg-[#976646] py-2"
					>
						{t("chess.generics.delete_data")}
					</button>
				</form>
			</div>
		</>
	);
}
