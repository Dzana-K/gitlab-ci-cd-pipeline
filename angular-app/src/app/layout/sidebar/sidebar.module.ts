import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


// Import other Conscia modules
import { MaterialModule } from '../../material.module';

// Import modules component and service
import { SidebarComponent } from './sidebar.component';
import { SidebarService } from './sidebar.service';

@NgModule({
    imports: [RouterModule, CommonModule, MaterialModule],
    declarations: [SidebarComponent],
    exports: [SidebarComponent],
    providers: [SidebarService],
})
export class SidebarModule {}