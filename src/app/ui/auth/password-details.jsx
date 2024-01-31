/**
 * @author frigvid
 */
export default function PasswordDetails() {
	return (
		<div className="flex flex-col items-center justify-center">
			<p className="mb-0 mr-2">
				The password must contain/be:
			</p>
			<ul className="list-disc -ml-10 mb-0 mr-2 text-left">
				<li>1 uppercase letter.</li>
				<li>1 lowercase letter.</li>
				<li>1 number.</li>
				<li>1 symbol.</li>
				<li>6+ characters long.</li>
			</ul>
		</div>
	);
}
