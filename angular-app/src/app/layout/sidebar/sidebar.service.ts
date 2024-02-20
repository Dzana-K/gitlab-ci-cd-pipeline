import { Injectable } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Injectable()
export class SidebarService {
    private sidebar!: MatSidenav;

    public setSidenav(sidenav: MatSidenav) {
        this.sidebar = sidenav;
    }

    public open() {
        return this.sidebar.open();
    }

    public close() {
        return this.sidebar.close();
    }

    public toggle(): void {
        this.sidebar.toggle();
    }
}
