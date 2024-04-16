/**
 * A custom 404 page for the application, to avoid the
 * default 404 page from pushing the footer out of the
 * viewport.
 *
 * @author frigvid
 * @created 2024-01-19
 */
export default function NotFound() {
	return (
		<div className="flex items-center justify-center">
			<h1 className="text-3xl font-medium mr-5 p-0">404</h1>
			<span>|</span>
			<h2 className="text-base font-normal m-0 pl-5">This page could not be found.</h2>
		</div>
	);
}
