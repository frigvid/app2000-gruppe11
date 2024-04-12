import removeGamedata from "@utils/game/remove-gamedata";
import {useUser} from "@auth/actions/useUser";

export default function DeleteData() {
	const user = useUser();
	
	const deleteData = async () => {
		void removeGamedata(user.id);
	};
	
	return (
		<>
			<div className="flex items-center gap-4">
				<form action={deleteData}>
					<button
						className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
					>
						Delete all gamedata
					</button>
				</form>
			</div>
		</>
	);
}
