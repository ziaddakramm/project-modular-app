import { NgModule } from "@angular/core";

import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../../auth/auth.guard";
import { MovieDetailComponent } from "./movie-detail.component";
import { SharedModule } from "../../shared/shared-module";
const routes: Routes = [
    { path: '', component: MovieDetailComponent, canActivate: [AuthGuard] },
  ];
@NgModule({
    declarations: [
    MovieDetailComponent  
    ],
      imports:[RouterModule.forChild(routes),SharedModule]
})
export class MovieDetailModule{}