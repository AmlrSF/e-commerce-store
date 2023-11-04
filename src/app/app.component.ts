import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private router:Router){};

  public shouldDisplayCategories(): boolean {
    // Get the current route's path
    const currentRoute = this.router.url;
  
  
    
    return currentRoute === '/';
  }

  public isHeaderFixed: boolean = false;

  @HostListener('window:scroll', [])
  onScroll(): void {
    this.isHeaderFixed = window.scrollY > 600;
  }
  

  scrollToTop(): void {
    window.scroll({ top: 0, behavior: 'smooth' });
  }

}
