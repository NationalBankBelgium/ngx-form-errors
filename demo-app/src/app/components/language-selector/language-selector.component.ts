import { Component, OnInit, OnDestroy, HostBinding } from "@angular/core";
import { Subscription } from "rxjs";
import { LangChangeEvent, TranslateService } from "@ngx-translate/core";

/**
 * Name of the component
 */
const componentName: string = "language-selector";

/**
 * Component to select the application's language from a list of available languages passed as parameter.
 */
@Component({
	selector: "app-language-selector",
	templateUrl: "./language-selector.component.html",
	styleUrls: ["./language-selector.component.scss"]
})
export class LanguageSelectorComponent implements OnInit, OnDestroy {
	@HostBinding("class")
	public cssClass: string = componentName;

	/**
	 * The currently selected language
	 */
	public selectedLanguage: string;

	/**
	 * A reference to the translateService subscription, needed to unsubscribe upon destroy.
	 */
	private languageChangeSubscription: Subscription;

	public supportedLanguages: string[] = ["en", "fr", "nl"];

	/**
	 * Class constructor
	 * @param translateService - the translation service of the application
	 */
	public constructor(protected translateService: TranslateService) {}

	/**
	 * Component lifecycle hook
	 */
	public ngOnInit(): void {
		console.log(componentName + ": controller initialized");

		this.selectedLanguage = this.translateService.currentLang;

		this.languageChangeSubscription = this.translateService.onLangChange.subscribe(
			(event: LangChangeEvent) => (this.selectedLanguage = event.lang),
			() => console.error(componentName + ": an error occurred getting the current language.")
		);
	}

	/**
	 * Component lifecycle hook
	 */
	public ngOnDestroy(): void {
		if (this.languageChangeSubscription) {
			this.languageChangeSubscription.unsubscribe();
		}
	}

	/**
	 * Change the current language based on the selection made by the user
	 */
	public changeLanguage(language: string): void {
		if (this.selectedLanguage !== language) {
			this.selectedLanguage = language;

			this.translateService.use(language);
		}
	}

	/**
	 * @ignore
	 */
	public trackLanguage(index: number): number {
		return index;
	}
}
