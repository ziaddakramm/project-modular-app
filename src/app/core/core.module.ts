import { NgModule } from "@angular/core";
import { HeaderComponent } from "../header/header.component";
import { SharedModule } from "../shared/shared-module";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../auth/auth.guard";
import { NotFoundComponent } from "./not-found/not-found.component";
const routes: Routes = [
    { 
      path: 'catalog', 
      loadChildren: () => import('./catalog/catalog.module').then(m => m.CatalogModule), 
      canActivate: [AuthGuard] 
    },
    { 
      path: 'movie/:id', 
      loadChildren: () => import('./movie-detail/movie-detail.module').then(m => m.MovieDetailModule), 
      canActivate: [AuthGuard] 
    }
  ];


@NgModule({
    declarations: [
        HeaderComponent,
        NotFoundComponent
    ],
    imports: [RouterModule.forChild(routes), SharedModule],
    exports: [HeaderComponent]
},)
export class CoreModule { }