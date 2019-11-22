import { AppPage } from "./app.po";
import { browser, logging } from "protractor";

describe("workspace-project App", () => {
	let page: AppPage;

	beforeEach(() => {
		page = new AppPage();
	});

	it("should display welcome message", async () => {
		await page.navigateTo();
		const titleText = await page.getTitleText();
		expect(titleText).toEqual("demo-app app is running!");
	});

	afterEach(async () => {
		// Assert that there are no errors emitted from the browser
		const logs = await browser
			.manage()
			.logs()
			.get(logging.Type.BROWSER);
		const expectedLogEntry: Partial<logging.Entry> = {
			level: logging.Level.SEVERE
		};
		expect(logs).not.toContain(jasmine.objectContaining(expectedLogEntry));
	});
});
