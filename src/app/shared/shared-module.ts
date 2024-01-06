import { NgModule } from "@angular/core";
import { LoadingSpinnerComponent } from "./loading-spinner/loading-spinner.component";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";

@NgModule({
    declarations: [
    LoadingSpinnerComponent,
    ],
    imports:[CommonModule,FormsModule,HttpClientModule,RouterModule],
    exports:[LoadingSpinnerComponent,CommonModule,FormsModule,HttpClientModule,RouterModule]
})
export class SharedModule{}