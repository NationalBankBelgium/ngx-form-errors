import { Component, HostBinding, Input } from "@angular/core";

@Component({
	selector: "app-card",
	templateUrl: "./card.component.html",
	styleUrls: ["./card.component.scss"]
})
export class CardComponent {
	@HostBinding("class.app-color-primary")
	public primaryColor = false;
	@HostBinding("class.app-color-accent")
	public accentColor = false;
	@HostBinding("class.app-color-warning")
	public warningColor = false;
	@HostBinding("class.app-color-success")
	public successColor = false;

	@Input()
	public set color(color: "primary" | "accent" | "warning" | "success") {
		this.primaryColor = false;
		this.accentColor = false;
		this.warningColor = false;
		this.successColor = false;

		switch (color) {
			case "primary":
				this.primaryColor = true;
				break;
			case "accent":
				this.accentColor = true;
				break;
			case "warning":
				this.warningColor = true;
				break;
			case "success":
				this.successColor = true;
				break;
			default:
				break;
		}
	}

	public constructor() {
		/*Do Nothing*/
	}
}
