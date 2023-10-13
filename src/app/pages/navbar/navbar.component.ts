import { Component } from '@angular/core';
import { Inavs } from 'src/app/interfaces/page-interfaces';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  public isOpen:boolean = false;
  public routes:Inavs[] = [
    {
      href:"/products",
      label:"Products",
      active:false
    },{
      href:"/new-arrivals",
      label:"New Arrivals",
      active:false
    },{
      href:"/best-sellers",
      label:"Best Sellers",
      active:false
    },{
      href:"/special-offer",
      label:"Special Offers",
      active:false
    },
    
  ]

  public categoriesWithSubcategories: { mainCategory: string; subcategories?: string[] }[] = [
    {
      mainCategory: "Food & Dining",
      subcategories: ["Restaurants", "Fast Food", "Cafes", "Groceries"],
    },
    {
      mainCategory: "Travel",
      subcategories: ["Air Travel", "Hotels", "Car Rentals", "Cruises"],
    },
    {
      mainCategory: "Entertainment",
      subcategories: ["Movies", "Music", "Events", "Gaming"],
    },
    {
      mainCategory: "Health & Fitness",
      subcategories: ["Gym", "Yoga", "Nutrition", "Sports"],
    },
    {
      mainCategory: "Technology",
    },
    {
      mainCategory: "Fashion",
    },
    {
      mainCategory: "Home & Garden",
    },
    {
      mainCategory: "Education",
    },
    {
      mainCategory: "Sports",
    },
    {
      mainCategory: "Books & Literature",
    },
  ];
  

  

  public closeNavbar(){
    this.isOpen = false;
  }

  public openNavbar(){
    this.isOpen = true;
  }

}
