import { TranslateService } from "@ngx-translate/core";

const translationsEn: object = require("../assets/translations/en.json");
const translationsFr: object = require("../assets/translations/fr.json");
const translationsNl: object = require("../assets/translations/nl.json");

/**
 * @param translateService - The translation service
 */
export function initializeTranslation(translateService: TranslateService): void {
	translateService.addLangs(["en", "fr", "nl"]);
	translateService.setDefaultLang("en");
	translateService.use("en");

	translateService.setTranslation("en", translationsEn);
	translateService.setTranslation("fr", translationsFr);
	translateService.setTranslation("nl", translationsNl);
}
