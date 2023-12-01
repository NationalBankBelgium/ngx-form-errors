import { Component, HostBinding } from "@angular/core";

const componentName = "navigation";

@Component({
	selector: "app-navigation",
	templateUrl: "./navigation.component.html",
	styleUrls: ["./navigation.component.scss"]
})
export class NavigationComponent {
	@HostBinding("class")
	public cssClass: string = componentName;

}
