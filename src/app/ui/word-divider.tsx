import React from "react";

/**
 * Type definition interface for props.
 */
interface OrDividerProps {
	word?: string,
	withWord?: boolean
}

/**
 * A simple component that provides a divider, and
 *
 * @author frigvid
 * @created 2024-04-09
 * @param word Which word to use in the divider, defaults to "Or"
 * @param withWord Whether or not to have a uniform divider or not.
 */
export default function WordDivider({
	word = "Or",
	withWord = true
}: OrDividerProps) {
	return (
		<div className="my-2 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
			{withWord ?
				<p className="mx-4 mb-0 text-center font-semibold">{word}</p>
				:
				<></>
			}
		</div>
	)
}
