import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { TestBed, inject } from '@angular/core/testing';

import { HttpParams } from '@angular/common/http';
import { PetService } from './pet.service';
import { ANIMALS } from '../../../../../server/db-data';

describe('PetService', () => {
    let service: PetService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [PetService,]
        });
        service = TestBed.inject(PetService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should fetch animals from the API via GET', () => {
        const mockParams = new HttpParams().set('type', 'Dog');

        service.getAnimals(mockParams).subscribe((animals: any[]) => {
            console.log(animals.length)
            expect(animals.length).toBe(1);
            expect(animals[0].name).toBe('Fluffy');
        });

        const req = httpMock.expectOne(`http://127.0.0.1:5000/animals?type=Dog`);
        expect(req.request.method).toBe('GET');
        req.flush(Object.values(ANIMALS).filter((animal: any) => animal.type === 'Dog') as any[]);
    });
    it('should fetch animal details from the API via GET', () => {
        const animalId = 1;

        service.getAnimalDetails(animalId).subscribe((animal: any) => {
            expect(animal.id).toBe(animalId);
            expect(animal.name).toBe('Fluffy');
        });

        const req = httpMock.expectOne(`http://127.0.0.1:5000/animal/${animalId}`);
        expect(req.request.method).toBe('GET');
        req.flush(ANIMALS[animalId]);
    });
});
