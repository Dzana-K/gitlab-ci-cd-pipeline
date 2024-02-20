import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { PetService } from '../../core/api/api/pet.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.scss'
})
export class UploadComponent {
  petForm: FormGroup;

  constructor(private fb: FormBuilder, private petService: PetService, private router: Router) {
    this.petForm = this.fb.group({
      name: [''],
      gender: [''],
      weight: [''],
      color: [''],
      age: [''],
      breed: [''],
      description: [''],
      city: [''],
      country: [''],
      type:[''],
      photos:[null]
     
    });
  }

  onFileChange(event: any): void {
    const files: FileList | null = event.target.files;
    if (files && files.length > 0) {
      // Use FileList to handle multiple files
      const fileArray: File[] = [];
      for (let i = 0; i < files.length; i++) {
        fileArray.push(files[i]);
      }
  
      // Set the value to an array of files
      const photosControl = this.petForm.get('photos');
      if (photosControl) {
        photosControl.setValue(fileArray);
      }
    }
  }
  onSubmit(): void {
    const formData = new FormData();
  
    // Append other form fields to formData
    Object.keys(this.petForm.value).forEach((key) => {
      if (key !== 'photos') {
        formData.append(key, this.petForm.value[key]);
      }
    });
  
    const photosControl = this.petForm.get('photos');
    if (photosControl && photosControl.value) {
      // Append each file separately
      for (let i = 0; i < photosControl.value.length; i++) {
        formData.append('photos', photosControl.value[i]);
      }
    }
  
    console.log(formData);
  
    this.petService.uploadPet(formData).subscribe(
      (response) => {
        console.log(response);
        this.router.navigate(['/dashboard']);
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
