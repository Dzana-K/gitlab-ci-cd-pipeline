import { Component, OnInit } from '@angular/core';
import { PetService } from '../../core/api/api/pet.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss'
})
export class FavoritesComponent implements OnInit {
  favorites: any[] = [];
  constructor(private petService: PetService){}
  ngOnInit(): void {
    this.petService.getFavorites().subscribe(
      (response) => {
        this.favorites = response;
      },
      (error) => {
        console.error('Error fetching favorites', error);
      }
    );
  }
 
}
