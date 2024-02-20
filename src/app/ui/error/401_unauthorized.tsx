/**
 * Use this error for when an Unauthorized request.
 *
 * See [Wikipedia - HTTP 401](https://en.wikipedia.org/wiki/HTTP_401)
 * for more information.
 *
 * @author frigvid
 */
export default function UnauthorizedError() {
	return (
		<div className="flex items-center justify-center">
			<h1 className="text-3xl font-medium mr-5 p-0">401</h1>
			<span>|</span>
			<h2 className="text-base font-normal m-0 pl-5">Unauthorized.</h2>
		</div>
	);
}
