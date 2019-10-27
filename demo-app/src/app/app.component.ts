import { Component, OnDestroy, ViewChild } from "@angular/core";
import { Event, NavigationEnd, Router } from "@angular/router";
import { MatSidenav } from "@angular/material/sidenav";
import { BreakpointObserver, BreakpointState } from "@angular/cdk/layout";
import { of, Subscription } from "rxjs";

const MEDIA_MATCH = "(max-width: 600px)";

@Component({
	selector: "app-root",
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnDestroy {
	@ViewChild("sidenav")
	private _sidenav!: MatSidenav;

	public mobileQueryMatches = false;

	private _routerSubscription: Subscription;
	private _mediaQuerySubscription: Subscription;

	public constructor(private _router: Router, public breakpointObserver: BreakpointObserver) {
		this.mobileQueryMatches = this.breakpointObserver.isMatched(MEDIA_MATCH);

		this._mediaQuerySubscription = this.breakpointObserver.observe([MEDIA_MATCH]).subscribe((state: BreakpointState) => {
			this.mobileQueryMatches = state.matches;
		});

		this._routerSubscription = this._router.events.subscribe((value: Event) => {
			if (value instanceof NavigationEnd && this._sidenav.mode === "over") {
				of(this._sidenav.close()).subscribe();
			}
		});
	}

	public ngOnDestroy(): void {
		this._mediaQuerySubscription.unsubscribe();
		this._routerSubscription.unsubscribe();
	}
}
