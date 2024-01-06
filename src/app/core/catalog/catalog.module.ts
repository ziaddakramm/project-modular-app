import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../../auth/auth.guard";
import { SharedModule } from "../../shared/shared-module";
import { CatalogComponent } from "./catalog.component";
import { MovieComponent } from "./movie/movie.component";

const routes: Routes = [
  { path: '', component: CatalogComponent, canActivate: [AuthGuard] }];
@NgModule({
  declarations: [
    CatalogComponent,
    MovieComponent
  ],
  imports: [RouterModule.forChild(routes), SharedModule]
})
export class CatalogModule { }