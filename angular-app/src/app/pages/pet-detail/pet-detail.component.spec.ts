import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetDetailComponent } from './pet-detail.component';
import { PetDetailModule } from './pet-detail.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterModule } from '@angular/router';

describe('PetDetailComponent', () => {
  let component: PetDetailComponent;
  let fixture: ComponentFixture<PetDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PetDetailModule, RouterModule.forRoot([]), HttpClientTestingModule,]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PetDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
