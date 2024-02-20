import {
    Component,
    ViewChild,
    HostListener,
    OnInit,
    AfterViewInit,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
// Import Modules and Components
import { MatSidenav } from '@angular/material/sidenav';


// Import Services
import { SidebarService } from './sidebar/sidebar.service';


@Component({
    selector: 'cni-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit, AfterViewInit {
    @ViewChild('sidebar')
    sidebar!: MatSidenav;

    public screenWidth!: number;
    public key = '';

    private internalScreenWidth = new BehaviorSubject<number>(
        window.innerWidth
    );

    constructor(private sidebarService: SidebarService) {}

    @HostListener('window:resize', ['$event'])
    onResize(event: { target: { innerWidth: number; }; }) {
        this.internalScreenWidth.next(event.target.innerWidth);
    }

    ngOnInit(): void {
        this.internalScreenWidth.subscribe((width) => {
            this.screenWidth = width;
        });
    }

    ngAfterViewInit(): void {
        this.sidebarService.setSidenav(this.sidebar);
    }
}