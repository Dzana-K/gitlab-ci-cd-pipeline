import { Component, OnInit } from '@angular/core';
import { PetService } from '../../core/api/api/pet.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../core/api/api/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { AdoptionPageModalComponent } from '../adoption-page-modal/adoption-page-modal.component';

@Component({
  selector: 'app-pet-detail',
  templateUrl: './pet-detail.component.html',
  styleUrl: './pet-detail.component.scss'
})
export class PetDetailComponent implements OnInit {
  id!: number;
  user:any;
  favorites: any[] = [];
  animalDetails: any;
  authenticatedUserId!: number;
  loadedUser!:string | null;
  is_favorite: boolean=false;
  constructor(private petService:PetService,
    private authService: AuthService,
              private route: ActivatedRoute,
              private router: Router,
              public dialog: MatDialog
    ){}
    ngOnInit(): void {
      
        this.loadedUser = this.authService.loadAuthenticatedUser();
        if (this.loadedUser !== null && this.loadedUser !== undefined) {
          this.authenticatedUserId = +this.loadedUser;
        }
      
      const idParam = this.route.snapshot.paramMap.get('id');
      this.id = idParam ? +idParam : 0;
      this.loadAnimalDetails();
      
      
      
    }
    loadAnimalDetails(): void {
      this.petService.getAnimalDetails(this.id).subscribe(
        (data) => {
          this.animalDetails = data;
          this.loadUserInfo(this.animalDetails.user_id);
          
          this.petService.getFavorites().subscribe(
            (response) => {
              this.favorites = response;
              this.checkIfFavorite();

            },
            (error) => {
              console.error('Error fetching favorites', error);
            }
          );
        },
        (error) => {
          console.error(error);
        }
      );
    }
    loadUserInfo(user_id:number){
      this.authService.getUser(user_id).subscribe(
        (response)=>{
          this.user=response;
         
          
        },
        (error)=>{
          console.error('Error fetching user data', error);
        }
      )
    }
    removeFromFavorites(): void {
      const data = { animal_id: this.id };
      this.petService.deleteFavorite(this.id).subscribe(
        () => {
          
          this.is_favorite = false; 
          
        },
        (error) => {
          console.error('Error removing animal from favorites', error);
        }
      );
    }
    checkIfFavorite(): void {
      // Check if the current animal ID is in favorites
      this.favorites.forEach((favorite) => {
        
        if (favorite.animal.id === this.id) {
          this.is_favorite = true; 
          
          return; 
        }
      });}
    toggleFavorite(): void {
      if (this.is_favorite) {
        this.removeFromFavorites();
        
      } else {
        this.addToFavorites();
      }}
    deletePost(animalId: number): void{
      const data = { animal_id: animalId };
      
      this.petService.deletePost(data.animal_id).subscribe(
        () => {
          
          this.router.navigate(['/dashboard']);
          
        },
        (error) => {
          console.error('Error deleting post', error);
        }
      );
    }
    openAdoptionModal(): void {
      const dialogRef = this.dialog.open(AdoptionPageModalComponent, {
        width: '800px', // Adjust the width as needed
       // position: { top: '-50%', left: '25%' },
        backdropClass: 'modal-backdrop',
        data: { id: this.id },
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        // Handle any actions after the modal is closed, if needed
      });
    }
    addToFavorites(): void {
      const data = { animal_id: this.id };
      this.petService.addFavorite(data).subscribe(
        () => {
          
          this.is_favorite=true;
          // You can update the local list if needed
        },
        (error) => {
          console.error('Error adding animal to favorites', error);
        }
      );
    }
}
