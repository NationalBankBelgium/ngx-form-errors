/*tslint:disable:completed-docs no-floating-promises*/
import { AppPage } from "./app.po";

describe("workspace-project App", () => {
	let page: AppPage;

	beforeEach(() => {
		page = new AppPage();
	});

	it("should display welcome message", async () => {
		await page.navigateTo();
		const titleText = await page.getTitleText();
		expect(titleText).toEqual("Welcome to demo-app!");
	});
});
