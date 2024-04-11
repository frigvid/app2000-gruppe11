/**
 * User profile's friend list component.
 *
 * @author frigvid
 * @created 2024-04-03
 */
export default function FriendList() {
	return (
		<>
			<h2 className="border-b-2 border-[#a1887f] pb-1 font-bold">Friends</h2>
			<div className="mt-2">
				<p>
					<span className="underline" title="@omnissiah#1111">Omnissiah</span>
					<span>, </span>
					<span className="underline" title="@serbianatlasian#7774">Serbian Atlasian</span>
				</p>
			</div>
		</>
	);
}
