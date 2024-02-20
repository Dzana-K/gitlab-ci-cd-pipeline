import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdoptionPageModalComponent } from './adoption-page-modal.component';

describe('AdoptionPageModalComponent', () => {
  let component: AdoptionPageModalComponent;
  let fixture: ComponentFixture<AdoptionPageModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdoptionPageModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdoptionPageModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
