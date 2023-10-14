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

  public categoriesWithSubcategories: { mainCategory: string; subcategories?: string[], showSubcategories?: boolean }[] = [
    {
      mainCategory: "Food & Dining",
      subcategories: ["Restaurants", "Fast Food", "Cafes", "Groceries"],
      showSubcategories: true,
    },
    {
      mainCategory: "Travel",
      subcategories: ["Air Travel", "Hotels", "Car Rentals", "Cruises"],
      showSubcategories: true,
    },
    {
      mainCategory: "Entertainment",
      subcategories: ["Movies", "Music", "Events", "Gaming"],
      showSubcategories: true,
    },
    {
      mainCategory: "Health & Fitness",
      subcategories: ["Gym", "Yoga", "Nutrition", "Sports"],
      showSubcategories: true,
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
  
  

  public toggleSubcategories(category: string): void {
    // Set all categories' showSubcategories to false
    this.categoriesWithSubcategories.forEach((item: { mainCategory: string, subcategories?: string[], showSubcategories?: boolean }) => {
      item.showSubcategories = true;
    });
  
    // Find the selected category and toggle its showSubcategories
    const foundCategory = this.categoriesWithSubcategories.find((item: { mainCategory: string, subcategories?: string[], showSubcategories?: boolean }) => {
      return item.mainCategory === category;
    });
  
    if (foundCategory) {
      foundCategory.showSubcategories = !foundCategory.showSubcategories;
    }
  }
  
  
  public closeNavbar(){
    this.isOpen = false;
  }

  public openNavbar(){
    this.isOpen = true;
  }

}
