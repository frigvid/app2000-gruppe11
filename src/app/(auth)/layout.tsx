"use client";

import withI18next from "@shared/components/lang/with-i18next";
import Header from "@shared/components/base/header";
import Footer from "@shared/components/base/footer";
import {ReactNode} from "react";

/**
 * A nested layout for the `(auth)` route group.
 *
 * @author frigvid
 * @created 2024-04-18
 * @param children The children to render.
 */
function AuthLayout({
	children,
}: {
	children: ReactNode
}) {
	return (
		<>
			<Header/>
			{children}
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
export default withI18next(AuthLayout);
