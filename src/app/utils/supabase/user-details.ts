"use client";

import {User} from "@supabase/gotrue-js";

function saveUserDetails(user: User) {
	sessionStorage.setItem("userEmail", user.email);
	sessionStorage.setItem("userId", user.id);
}

export default saveUserDetails;
