import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PetService } from '../../core/api/api/pet.service';
import { AuthService } from '../../core/api/api/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-adoption-page-modal',
  templateUrl: './adoption-page-modal.component.html',
  styleUrl: './adoption-page-modal.component.scss'
})
export class AdoptionPageModalComponent implements OnInit {
  adoptionForm: FormGroup;
  authenticatedUserId!: number;
  loadedUser!:string | null;
  sendingUser: any;
  recipientUser: any;
  animalDetails: any;
  id!: number;
  constructor(private fb: FormBuilder,
  private dialogRef: MatDialogRef<AdoptionPageModalComponent>,
  private petService: PetService, 
  private authService: AuthService,
  private route: ActivatedRoute,
              private router: Router,
              @Inject(MAT_DIALOG_DATA) public data: { id: number }
  ){
    this.adoptionForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      // Add other fields as needed
    });
    this.id = data.id;
}
 ngOnInit(): void {
  this.loadedUser = this.authService.loadAuthenticatedUser();
  if (this.loadedUser !== null && this.loadedUser !== undefined) {
    this.authenticatedUserId = +this.loadedUser;
  }

  
  this.loadAnimalDetails();
      
 }
  onSubmit() {
    console.log(this.adoptionForm.value)
    if (this.adoptionForm.valid) {
      const emailData = {
        recipient: this.recipientUser.email,
        subject: 'PawAdopt',
        body: `
        Hello,
  
        You have received an adoption inquiry for your pet.
  
        Details:
        - Pet Name: ${this.animalDetails.name}
        - Interested Person's Email: ${this.adoptionForm.value.email}
        - Interested Person's Phone Number: ${this.adoptionForm.value.phoneNumber}
  
        Please reach out to them at your earliest convenience.
  
        Thank you,
        PawAdopt
      `
      };
      this.petService.sendEmail(emailData)
      .subscribe(
        () => console.log('Email sent successfully'),
        error => console.error('Error sending email', error)
      );
      
    }
  }
  onCancel(): void {
    this.dialogRef.close();
  }
 
  loadAnimalDetails(): void {
    this.petService.getAnimalDetails(this.id).subscribe(
      (data) => {
        this.animalDetails = data;
        this.authService.getUser(this.animalDetails.user_id).subscribe(
          (response)=>{
            this.recipientUser=response;
            console.log(typeof(this.recipientUser.email));
          },
          (error)=>{
            console.error('Error fetching user data', error);
          }
        )
        console.log(this.animalDetails)
      },
      (error) => {
        console.error(error);
      }
    );
  }
  
}
