import ProtectContent from "@auth/components/protect-page";

/**
 * Stub page for user settings.
 *
 * Currently not accessible without manually
 * inputting the link.
 *
 * @author frigvid
 */
export default function UserSettings() {
	return (
		ProtectContent(
			<main className="flex justify-center items-center">
				<p>Settings</p>
			</main>
		)
	);
}
