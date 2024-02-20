import { NgModule } from '@angular/core';
import { MatNativeDateModule } from '@angular/material/core';
import { DomSanitizer } from '@angular/platform-browser';

import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';

/**
 * @export
 * @class MaterialModule
 */

@NgModule({
    exports: [
        MatBadgeModule,
        MatButtonModule,
        MatCardModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatDialogModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatGridListModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatMenuModule,
        MatNativeDateModule,
        MatPaginatorModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatRadioModule,
        MatSelectModule,
        MatSidenavModule,
        MatSlideToggleModule,
        MatSnackBarModule,
        MatSortModule,
        MatTableModule,
        MatTabsModule,
        MatToolbarModule,
        MatTooltipModule,
        MatAutocompleteModule,
        MatChipsModule,
        DragDropModule
    ],
    declarations: [],
    providers: [MatIconRegistry],
})
export class MaterialModule {
    constructor(
        private matIconRegistry: MatIconRegistry,
        private domSanitizer: DomSanitizer
    ) {
        // Add Conscia device Status icons to the mat-icon library
        this.matIconRegistry.addSvgIcon(
            'discover-fill',
            this.domSanitizer.bypassSecurityTrustResourceUrl(
                '../../../assets/icons/discover-fill.svg'
            )
        );
        this.matIconRegistry.addSvgIcon(
            'discover-outline',
            this.domSanitizer.bypassSecurityTrustResourceUrl(
                '../../../assets/icons/discover-outline.svg'
            )
        );
        this.matIconRegistry.addSvgIcon(
            'heart-fill',
            this.domSanitizer.bypassSecurityTrustResourceUrl(
                '../../../assets/icons/heart-fill.svg'
            )
        );
        this.matIconRegistry.addSvgIcon(
            'heart-outline',
            this.domSanitizer.bypassSecurityTrustResourceUrl(
                '../../../assets/icons/heart-outline.svg'
            )
        );
        this.matIconRegistry.addSvgIcon(
            'profile-fill',
            this.domSanitizer.bypassSecurityTrustResourceUrl(
                '../../../assets/icons/profile-fill.svg'
            )
        );
        this.matIconRegistry.addSvgIcon(
            'profile-outline',
            this.domSanitizer.bypassSecurityTrustResourceUrl(
                '../../../assets/icons/profile-outline.svg'
            )
        );
        this.matIconRegistry.addSvgIcon(
            'upload-fill',
            this.domSanitizer.bypassSecurityTrustResourceUrl(
                '../../../assets/icons/upload-fill.svg'
            )
        );
        this.matIconRegistry.addSvgIcon(
            'upload-outline',
            this.domSanitizer.bypassSecurityTrustResourceUrl(
                '../../../assets/icons/upload-outline.svg'
            )
        );

        this.matIconRegistry.addSvgIcon(
            'logout-fill',
            this.domSanitizer.bypassSecurityTrustResourceUrl(
                '../../../assets/icons/logout-fill.svg'
            )
        );
        this.matIconRegistry.addSvgIcon(
            'logout-outline',
            this.domSanitizer.bypassSecurityTrustResourceUrl(
                '../../../assets/icons/logout-outline.svg'
            )
        );

    }
}
