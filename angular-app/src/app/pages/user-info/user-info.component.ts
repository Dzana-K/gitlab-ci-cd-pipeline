import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from '../../core/api/api/auth.service';
import { PetService } from '../../core/api/api/pet.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.scss'
})
export class UserInfoComponent implements OnInit {
  authenticatedUserId!: number;
  loadedUser!:string | null;
  user:any;
  animals: any[] = [];
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
    this.loadUserInfo();
    this.fetchUserPosts();
  }
  loadUserInfo(){
    this.authService.getUser(this.authenticatedUserId).subscribe(
      (response)=>{
        this.user=response;
        
      },
      (error)=>{
        console.error('Error fetching user data', error);
      }
    )
  }
  fetchUserPosts(): void {
    this.petService.getUserPosts().subscribe(
      (animals) => {
        this.animals = animals;
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
