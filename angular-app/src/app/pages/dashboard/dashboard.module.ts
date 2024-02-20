import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule } from '@angular/router';

import { LayoutModule } from '../../layout/layout.module';
import { MatIconModule } from '@angular/material/icon';
@NgModule({
    declarations:[DashboardComponent],
    imports:[CommonModule, FormsModule,  BrowserModule, SharedModule, RouterModule, MatIconModule]
})

export class DashboardModule{}