import removeGamedata from "@utils/game/remove-gamedata";
import {useUser} from "@auth/actions/useUser";
import {useTranslation} from "react-i18next";

/**
 * Function to delete the user's gamedata.
 *
 * NOTE: Current implementation will become obsolete soon,
 * 		when game data is calculated relative to their
 * 		total game history instead.
 */
export default function DeleteData() {
	const user = useUser();
	const {t} = useTranslation();
	
	/**
	 * Anonymous asynchronous function to delete the
	 * user's gamedata, and voiding the promise.
	 *
	 * @author frigvid
	 * @created 2024-02-05
	 */
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
