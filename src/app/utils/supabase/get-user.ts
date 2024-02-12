import {createClient} from "@lib/supabase/client";
import {User} from "@supabase/gotrue-js";
import logman from "@utils/logman";

const supabase = createClient();

//export async function getUserId() {
//	const {data: {user}} = await supabase.auth.getUser().then((user) => {return user});
//	return user;
//}

export const getUser = async (): Promise<User | undefined> => {
	//const { data, error } = await supabase.auth.getUser();
	const { data: {user}, error } = await supabase.auth.getUser();
	logman(user.id);

	if (error) {
		console.error(error);
	}

	return user;
}
