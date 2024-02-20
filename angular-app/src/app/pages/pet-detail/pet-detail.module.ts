import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { PetDetailComponent } from './pet-detail.component';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
@NgModule({
    declarations:[PetDetailComponent],
    imports:[CommonModule, FormsModule, ReactiveFormsModule, BrowserModule, SharedModule]
})

export class PetDetailModule{}