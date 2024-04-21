"use client";

import withI18next from "@shared/components/lang/with-i18next";
import Footer from "@shared/components/base/footer";
import Header from "@shared/components/base/header";

/**
 * A custom 404 page for the application, to avoid the
 * default 404 page from pushing the footer out of the
 * viewport.
 *
 * Since this is a default page, and 'shared' is not a
 * route, the header and footer component are included
 * manually.
 *
 * @author frigvid
 * @created 2024-01-19
 */
function NotFound() {
	return (
		<>
			<Header/>
				<div className="flex items-center justify-center">
					<h1 className="text-3xl font-medium mr-5 p-0">404</h1>
					<span>|</span>
					<h2 className="text-base font-normal m-0 pl-5">This page could not be found.</h2>
				</div>
			<Footer/>
		</>
	);
}

/**
 * Export with extra i18next support,
 * to avoid hydration errors.
 *
 * @author frigvid
 * @created 2024-04-19
 */
export default withI18next(NotFound);
