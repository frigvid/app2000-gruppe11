import PickOpening from "@game/chess/train/repertoire/[id]/components/pick-opening";
import {useTranslation} from "react-i18next";
import Link from "next/link";

/**
 * Panel to display information about the practice status.
 *
 * @author qwertyfyr
 * @contributor frigvid
 * @created 2024-04-12
 * @param status The status message of the practice.
 * @param moveCounter The number of moves made.
 * @param pgn The PGN of the practice session.
 * @param repo The repertoire of openings.
 * @param opening The opening that is selected.
 * @param setOpening The function to set the opening.
 * @returns returns the panel with information about the practice status
 */
export default function TrainPanel({
	status,
	setStatus,
	moveCounter,
	pgn,
	repo,
	opening,
	setOpening,
}) {
	const {t} = useTranslation();

	return (
		<section className="flex flex-col justify-center mr-8 p-3 px-8 max-w-[22rem] bg-gray-200 rounded-lg border border-gray-200 shadow-md text-center space-y-4">
			<h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
				{t("chess.train_chess.panel.label")}
			</h2>
			<div className="italic">
				{
					(status === "Wrong move!")
						? <p className="bg-red-500 p-2">{status}</p>
						: (status === "Opening completed!")
							? <p className="bg-green-500 p-2">{status}</p>
							: <p className="p-2">{status}</p>
				}
			</div>
			<p>
				{t("chess.train_chess.panel.move.part1")} {moveCounter}{" "}
				{t("chess.train_chess.panel.move.part2")} {pgn.length}
			</p>
			<Link
				href="/chess/stages"
				className="bg-buttoncolor inline-block rounded px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-danger mt-4 hover:bg-[#976646] py-2"
			>
				{t("chess.train_chess.panel.return")}
			</Link>
			<div>
				{
					repo == null
						? <></>
						: (
							<>
								<label>{t("chess.train_chess.panel.openings")}:</label>
								<PickOpening
									repo={repo}
									opening={opening}
									setOpening={setOpening}
									setStatus={setStatus}
								/>
							</>
						)
				}
			</div>
		</section>
	);
}
