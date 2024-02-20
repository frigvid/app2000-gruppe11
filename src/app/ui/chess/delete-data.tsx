import removeGamedata from "@utils/game/remove-gamedata";

export default function DeleteData() {

	const deleteData = async () => {
		//"use server";
		removeGamedata("dfe83755-0afa-438d-8740-b980ea59d5a4").then(r => console.log("Added data to database."))
	}

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
	)
}
