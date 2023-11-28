import { Component, HostListener, OnInit } from '@angular/core';
import { Inavs } from 'src/app/interfaces/page-interfaces';
import { ProductService } from 'src/app/product.service';
import { ActivatedRoute,Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  public isOpen:boolean = false;
  public isopencats:boolean = true;
  public routes:Inavs[] = [
    {
      href:"/products",
      label:"Products",
      active:false
    }//,{
    //   href:"/new-arrivals",
    //   label:"New Arrivals",
    //   active:false
    // },{
    //   href:"/best-sellers",
    //   label:"Best Sellers",
    //   active:false
    // },{
    //   href:"/special-offer",
    //   label:"Special Offers",
    //   active:false
    // },
    
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
  public slides = [
    {
      src: '../../../assets/slider/slider0.jpg',
      title: 'Spring Fashion Extravaganza',
      subtitle: 'Get Ready for the Season\'s Hottest Styles',
    },
    {
      src: '../../../assets/slider/slider1.jpg',
      title: 'Exclusive Discounts Inside',
      subtitle: 'Shop Now for Unbeatable Savings',
    },
    {
      src: '../../../assets/slider/slider2.jpg',
      title: 'Elevate Your Style',
      subtitle: 'Discover Premium Fashion Choices',
    },
    {
      src: '../../../assets/slider/slider3.jpg',
      title: 'New Arrivals Every Week',
      subtitle: 'Stay Ahead of the Fashion Curve',
    },
  ];
  
  constructor (private productS:ProductService,private router: Router,private http: HttpClient){}
  currentRouteURL = this.router.url.substring(1);
  public result:any;
  ngOnInit(): void {   
    const gettoken = localStorage.getItem('token'); 
    let token = {
      token : gettoken
    }
    try {
      this.http.post(`http://localhost:3000/api/v1/customers/profile`,token).subscribe(
        (res:any)=>{
          console.log(res);
          this.result = res.costumer;
        },err=>{
          console.log(err);
        }
      )
    } catch (error) {
      
    }
  }
;

  public toggleSubcategories(category: string): void {
    // Set all categories' showSubcategories to false
    this.categoriesWithSubcategories.map((item: { mainCategory: string, subcategories?: string[], showSubcategories?: boolean }) => {
      item.showSubcategories = true;
    });
    
  
    // Find the selected category and toggle its showSubcategories
    const foundCategory = this.categoriesWithSubcategories.find((item: { mainCategory: string, subcategories?: string[], showSubcategories?: boolean }) => {
      return item.mainCategory === category;
    });
    console.log(foundCategory);
  
    if (foundCategory) {
      foundCategory.showSubcategories = !foundCategory.showSubcategories;
    }

    console.log(foundCategory);
  }
  
  public closeNavbar(){
    this.isOpen = false;
  }

  public openNavbar(){
    this.isOpen = true;
  }

    // A property to track the currently selected slide
  public activeSlide = 0;

  // Function to select a slide
  public selectSlide(index: number): void {
    this.activeSlide = index;
  }

  getFavoriteItemCount(): number {
    return this.productS.getFavoriteItemCount();
  }

  getCartItemCount(): number {
    return this.productS.getCartItemCount();
  }

  calculateCartTotal(): number {
    return this.productS.calculateCartTotal();
  }

  togglecats(){
    this.isopencats = !this.isopencats;
  }
  public isHeaderFixed: boolean = false;

  @HostListener('window:scroll', [])
  onScroll(): void {
    this.isHeaderFixed = window.scrollY > 350;
  }
  
}
