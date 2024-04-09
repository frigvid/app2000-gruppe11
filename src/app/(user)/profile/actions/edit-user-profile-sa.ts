"use server";

import {createClient} from "@utils/supabase/server";
import {redirect} from "next/navigation";
import {cookies} from "next/headers";

/**
 *	Takes a form's data as an object input, and extracts
 *	individual pieces of it, to then insert into the
 *	database.
 *
 * @author frigvid
 * @created 2024-04-09
 * @param formData The form's data as an object.
 */
export default async function editUserProfileSA(formData: FormData) {
	const cookieStore = cookies();
	const supabase = createClient(cookieStore);
	const {data: {user}} = await supabase.auth.getUser();
	
	void await supabase.rpc("user_profile_modify", {
		usr_avatar_url: formData.get("avatar_url").toString(),
		usr_display_name: formData.get("display_name").toString(),
		usr_about_me: formData.get("about_me").toString(),
		usr_nationality: formData.get("rcrs-country").toString()
	});
	
	for (const [key, value] of formData) {
		console.log("KEY: " + key, "VALUE: " + value);
	}
	
	return redirect("/profile/" + user.id);
};
