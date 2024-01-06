import { NgModule } from "@angular/core";

import { RouterModule, Routes } from "@angular/router";


import { AuthGuard } from "./auth.guard";
import { AuthComponent } from "./auth.component";
import { SharedModule } from "../shared/shared-module";


const routes: Routes = [
    { path: 'auth', component: AuthComponent, canActivate: [AuthGuard] },
  ];
  
@NgModule({
    declarations: [
    AuthComponent
      ],
      imports:[ RouterModule.forChild(routes),SharedModule],
      exports:[]
})
export class AuthModule{}