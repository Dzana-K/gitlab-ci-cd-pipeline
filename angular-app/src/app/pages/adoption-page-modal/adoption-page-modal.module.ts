import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {AdoptionPageModalComponent} from './adoption-page-modal.component';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule } from '@angular/router';
@NgModule({
    declarations:[AdoptionPageModalComponent],
    imports:[CommonModule, FormsModule, ReactiveFormsModule, BrowserModule, SharedModule, RouterModule]
})

export class AdoptionPageModalModule{}