import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import {
	NgxFormsExampleComponent,
	ReactiveFormsExampleComponent,
	TemplateDrivenFormsExampleComponent,
	TypedReactiveFormsExampleComponent
} from "./pages";

const routes: Routes = [
	{ path: "", redirectTo: "/template-driven-forms", pathMatch: "full" },
	{ path: "reactive-forms", component: ReactiveFormsExampleComponent },
	{ path: "template-driven-forms", component: TemplateDrivenFormsExampleComponent },
	{ path: "ngx-form-errors", component: NgxFormsExampleComponent },
	{ path: "typed-reactive-forms", component: TypedReactiveFormsExampleComponent }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}
