/**
 * Use this error for when a malformed request occurs,
 * or some data wasn't understood by the server.
 *
 * See [Wikipedia - HTTP 403](https://en.wikipedia.org/wiki/HTTP_403) for more information.
 *
 * @author frigvid
 * @created 2024-02-13
 */
export default function ForbiddenError() {
	return (
		<div className="flex items-center justify-center">
			<h1 className="text-3xl font-medium mr-5 p-0">403</h1>
			<span>|</span>
			<h2 className="text-base font-normal m-0 pl-5">Forbidden.</h2>
		</div>
	);
}
