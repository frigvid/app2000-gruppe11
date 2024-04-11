"use client";

import {I18nextProvider} from "react-i18next";
import i18n from "@/app/i18next.js";
import React from "react";

/**
 * Higher-order component to provide i18next translation context to a component.
 *
 * This is primarily to avoid hydration errors, which means it's an ugly workaround.
 * However, it is what it is, and it works. See the linked StackOverflow answer for
 * more details on how we should've approached translation.
 *
 * @example
 * import withI18next from "@ui/lang/with-i18next";
 *
 * function SomePage() {
 *   // Page content.
 * }
 *
 * export default withI18next(MyPage);
 *
 * @author frigvid
 * @created 2024-04-11
 * @param WrappedComponent The component to wrap with the i18next provider.
 * @see https://stackoverflow.com/a/77033282/13864544
 */
export default function withI18next(WrappedComponent) {
	class WithI18next extends React.Component {
		render() {
			return (
				<I18nextProvider i18n={i18n}>
					<WrappedComponent {...this.props} />
				</I18nextProvider>
			);
		}
	}
	
	WithI18next.displayName = `WithI18next(${getDisplayName(WrappedComponent)})`;
	
	/* This might look a bit wierd, but this is to ensure it returns as a "component."
	 * Some things don't play nice otherwise.
	 *
	 * It does need the below eslint line though. It doesn't cause any issues, just a
	 * difference between a TypeScript interpreter used for JavaScript/JSX.
	 */
	// eslint-disable-next-line react/display-name
	return function (props) {
		return <WithI18next {...props} />;
	};
};

function getDisplayName(WrappedComponent) {
	return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}
