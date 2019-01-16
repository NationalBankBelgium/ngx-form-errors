import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ReactiveFormsExampleComponent, NgxFormsExampleComponent, TemplateDrivenFormsExampleComponent } from "./pages";

const routes: Routes = [
	{ path: "", redirectTo: "/template-driven-forms", pathMatch: "full" },
	{ path: "reactive-forms", component: ReactiveFormsExampleComponent },
	{ path: "template-driven-forms", component: TemplateDrivenFormsExampleComponent },
	{ path: "ngx-form-errors", component: NgxFormsExampleComponent }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}
