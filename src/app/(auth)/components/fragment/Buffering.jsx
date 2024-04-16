/**
 * This is a small fragment-type component, it only provides a small animated buffering icon,
 * which can be used to hide that content doesn't always load immediately.
 *
 * It's currently in use in the ProtectClientContent component.
 *
 * @example
 *	// Set up a const somewhere.
 * const [loading, setLoading] = useState(true);
 *
 * // Then use this before the return statement.
 * if (loading) {
 * 	return <Buffering/>;
 * }
 *
 * @frigvid
 * @created 2024-04-06
 * @return {React.JSX.Element} The buffering animation element.
 * @see ProtectClientContent for actual usage example.
 */
export default function Buffering() {
	return (
		<div className="flex justify-center items-center">
			<div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"/>
		</div>
	);
};
