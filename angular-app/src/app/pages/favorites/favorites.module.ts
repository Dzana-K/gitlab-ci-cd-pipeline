import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {FavoritesComponent } from './favorites.component';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations:[FavoritesComponent],
    imports:[CommonModule, FormsModule, ReactiveFormsModule, BrowserModule, SharedModule, RouterModule]
})

export class FavoritesModule{}