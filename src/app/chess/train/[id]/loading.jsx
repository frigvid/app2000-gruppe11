import Buffering from "@/app/(auth)/components/fragment/Buffering";

/**
 * A loading state for the training page.
 *
 * This is following the details outlined by Next.js in their documentation.
 *
 * @author qwertyfyr
 * @contributor frigvid
 * @created 2024-04-12
 * @returns loading page whilst the page is loading for the training
 * @see https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming
 */
export default function Loading() {
	return <Buffering/>
};
