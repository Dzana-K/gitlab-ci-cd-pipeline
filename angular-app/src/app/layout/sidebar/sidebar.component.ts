import {
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subject, Subscription, filter } from 'rxjs';

// Import application and module services
import { AuthService } from '../../core/api/api/auth.service';

import { ActivatedRoute, NavigationEnd, Router, Event } from '@angular/router';

/**
* MenuItem defines the individual menu items shown in the Sidebar. A menu item can either be a
* single line menu entry, a multi line menu entry, which is a placeholder with single menu child entries
* or a notify menu entry, which is a special single menu item which has a "Badge" counter shown with menu title.
* MenuItem is defined with the following parameters:
*
* @path :     set the URL of the menu route
* @title :    set the title of the menu entry shown
* @type :     type of menu item, can be one of these [single, multi, notify]
* @icon :     set the icon name shown as part of the menu line
* @active :   set if the menu is actice by default [true, false]
* @children : only part of a type: multi, and holds a list of single menu items
*/
export interface MenuItem {
  path: string; // hold the path for the navigation link
  title: string; // hold the title name for the navigation link
  type: string; // what kind navigation link ? single link or multi link (with children)
  icon: string; // hold the icon for this navigation link
  iconFill: string;
  active: boolean; // used to control if menu item is diabled or not
  children?: MenuItem[]; // if it's a multi-link, then hold the children links
}

/**
* const definition of the Sidebar menu. Must be defined in the order it should be shown
* on the sidebar.
*/
export const ROUTES: MenuItem[] = [
  {
      path: '/dashboard',
      title: 'Discover',
      type: 'single',
      icon: 'discover-outline',
      iconFill: 'discover-fill',
      active: true,
  },
  {
      path: '/favorites',
      title: 'Favorites',
      type: 'single',
      icon: 'heart-outline',
      iconFill: 'heart-fill',
      active: true,
  },
  {
      path: '/user-info',
      title: 'Profile',
      type: 'single',
      icon: 'profile-outline',
      iconFill: 'profile-fill',
      active: true,
  },
  {
      path: '/upload',
      title: 'Upload',
      type: 'single',
      icon: 'upload-outline',
      iconFill: 'upload-fill',
      active: true,
  },

{
  path: 'logout',
  title: 'Logout',
  type: 'button',
  icon: 'logout-outline',
  iconFill: 'logout-fill',
  active: true,
},
];

interface IsActiveMatchOptions {
  matrixParams: 'exact' | 'subset' | 'ignored';
  queryParams: 'exact' | 'subset' | 'ignored';
  paths: 'exact' | 'subset';
  fragment: 'exact' | 'ignored';
}

@Component({
  selector: 'cni-sidebar-cmp',
  templateUrl: 'sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit, OnDestroy {
  public menuItems!: MenuItem[];
  filled = false;
  hoverIndex!: number | null;
  stayIndex!: number | null;
  myMatchOptions: IsActiveMatchOptions = {
      queryParams: 'ignored',
      matrixParams: 'ignored',
      paths: 'subset',
      fragment: 'ignored',
  };
  // define private variables
  private destroy: Subject<boolean> = new Subject<boolean>();
  private routerEventSubscription!: Subscription;

  constructor(private authService: AuthService, private router: Router, private route:ActivatedRoute) {}

  ngOnInit() {
      this.menuItems = ROUTES;
      this.menuItems.forEach((menuItem: any, i: any) => {
          const currentPath = this.router.url;
          if (currentPath.startsWith(menuItem.path)) {
              this.stayIndex = i;
          }
      });
     this.routerEventSubscription=this.router.events.pipe(
      filter((event: Event): event is NavigationEnd => event instanceof NavigationEnd)
      ).subscribe((event: NavigationEnd) => {
          const currentPath = this.router.url;
          let foundMatch = false;
          for (let i = 0; i < this.menuItems.length; i++) {
              const menuItem = this.menuItems[i];
              if (currentPath.startsWith(menuItem.path) ) {
                  this.stayIndex = i;
                  foundMatch = true;
              }
              if (!foundMatch) {
                      this.stayIndex = null;
                  }
          }
      });
  }
  /**
   * _destroy is used to unsubscribe all observabels in this component, and is referenced in the
   * Observables takeUntil, and as such the Observable will exist until _destroy is complete.
   */
  enter(i:number | null) {
      this.hoverIndex = i;
  }
  stay(i: number | null) {
      this.stayIndex=i;
  }
  leave() {
      this.hoverIndex = null;
  }
  isPathPrefixMatch(path: string) {
  return this.router.url.startsWith(path);
  }
  ngOnDestroy() {
      this.destroy.next(true);
      this.destroy.complete();
      if (this.routerEventSubscription) {
    this.routerEventSubscription.unsubscribe();
  }
  }
  logout(): void {
    this.authService.logout().subscribe(
      response => {
        // Handle successful logout response
        this.router.navigate(['/login'])
        console.log('Logout successful', response);
        this.authService.removeUserId();
      },
      error => {
        // Handle error
        console.error('Logout failed', error);
      }
    );
  }

  
}

