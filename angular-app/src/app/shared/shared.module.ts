import { NgModule } from "@angular/core";
import { AlertComponent } from "./alert/alert.component";
import { PlaceholderDirective } from "./placeholder/placeholder.directive";
import { CommonModule } from "@angular/common";

@NgModule({
    declarations:[
        AlertComponent,
        PlaceholderDirective
    ],
    imports:[CommonModule],
    exports:[
        AlertComponent,
        PlaceholderDirective
    ],
   
})

export class SharedModule{

}