import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UploadComponent } from './upload.component';
import { SharedModule } from '../../shared/shared.module';
import { MatSelectModule } from '@angular/material/select';
@NgModule({
    declarations:[UploadComponent],
    imports:[CommonModule, FormsModule, ReactiveFormsModule, BrowserModule, SharedModule, MatSelectModule]
})

export class UploadModule{}