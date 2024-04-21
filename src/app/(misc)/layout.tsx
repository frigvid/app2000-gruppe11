"use client";

import CookieBanner from "@shared/components/base/cookie-banner";
import withI18next from "@shared/components/lang/with-i18next";
import Header from "@shared/components/base/header";
import Footer from "@shared/components/base/footer";
import {ReactNode, useEffect, useState} from "react";

/**
 * A nested layout for the `(misc)` route group.
 *
 * @author frigvid
 * @created 2024-04-18
 * @param children The children to render.
 */
function MiscellaneousLayout({
	children,
}: {
	children: ReactNode
}) {
	const [cookieBanner, setCookieBanner] = useState(false);
	
	/**
	 * Check if the cookie banner should appear or not.
	 *
	 * If either null, or false, it should appear. As
	 * the users need to be informed about the use of
	 * cookies, to be compliant with GDPR.
	 *
	 * I'm not going to say this is a pretty solution,
	 * but it works.
	 *
	 * @author frigvid
	 * @created 2024-04-19
	 */
	useEffect(() => {
		setCookieBanner((localStorage?.getItem("cookieBanner") === null || localStorage?.getItem("cookieBanner") === "false"));
	}, []);
	
	return (
		<>
			<Header/>
			{children}
			{cookieBanner && (<CookieBanner/>)}
			<Footer/>
		</>
	)
}

/**
 * Exported with extra i18next support, to avoid
 * hydration errors.
 *
 * And to let nested layouts like these perhaps
 * work a bit better.
 *
 * @author frigvid
 * @created 2024-04-18
 */
export default withI18next(MiscellaneousLayout);
