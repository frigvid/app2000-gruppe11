import ProtectContent from "@/app/(auth)/components/protect-page";

/**
 * Stub page for user profiles.
 *
 * Currently not accessible without manually
 * inputting the link.
 *
 * @author frigvid
 */
export default function UserProfile() {
	return (
		ProtectContent(
			<main className="flex justify-center items-center">
				<p>User profile</p>
			</main>
		)
	);
}
