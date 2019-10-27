/*tslint:disable:completed-docs typedef*/
import { browser, by, element } from "protractor";

export class AppPage {
	public navigateTo() {
		return browser.get("/") as Promise<string>;
	}

	public getTitleText() {
		return element(by.css("app-root h1")).getText() as Promise<string>;
	}
}
