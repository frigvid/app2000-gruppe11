import withI18next from "@ui/lang/with-i18next";
import {useTranslation} from "react-i18next";

/**
 * Use this error for when something generic goes wrong.
 *
 * @author frigvid
 * @created 2024-02-13
 */
function InternalServerError() {
	const {t} = useTranslation();
	
	return (
		<div className="flex flex-col items-center justify-center">
			<div className="flex items-center">
				<h1 className="text-3xl font-medium mr-5 p-0">500</h1>
				<span>|</span>
				<h2 className="text-base font-normal m-0 pl-5">{t("error.500.title")}</h2>
			</div>
			<p className="mt-4 italic">{t("error.500.message")}</p>
		</div>
	);
}

/**
 * Export with extra i18next support,
 * to avoid hydration errors.
 *
 * @author frigvid
 * @created 2024-04-11
 */
export default withI18next(InternalServerError);
