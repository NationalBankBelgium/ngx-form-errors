import { Component, HostBinding } from "@angular/core";

const componentName: string = "navigation";

@Component({
	selector: "app-navigation",
	templateUrl: "./navigation.component.html",
	styleUrls: ["./navigation.component.scss"]
})
export class NavigationComponent {
	@HostBinding("class")
	public cssClass: string = componentName;

	public constructor() {
		/*Do Nothing*/
	}
}
