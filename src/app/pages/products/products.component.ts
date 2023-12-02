import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/product.service';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { startWith, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  animations: [
    trigger('expandCollapse', [
      state('open', style({ height: '*' })),
      state('closed', style({ height: '0px', overflow: 'hidden' })),
      transition('open <=> closed', animate('300ms ease-in-out')),
    ]),
  ],
  
})
export class ProductsComponent implements OnInit {
  public products: any[] = [];
  public filteredProducts: Observable<any[]> | undefined; // Use Observable for async pipe
  public productForm: FormGroup;
  public searchTerm:string="";
  public showCategory: boolean = true;
  public showTags: boolean = true;
  public showPrice: boolean = true;
  public showDate: boolean = true;

  public isLoading: boolean = false;

  constructor(private fb: FormBuilder, private productS: ProductService,private route: ActivatedRoute) {
    this.productForm = this.fb.group({
      category: [''],
      tag: [''],
      minPrice: [''],
      maxPrice: [''],
      sortOrder: ['asc'], // New control for sorting
    });
    
  }

  toggleSection(section: string) {
    switch (section) {
      case 'category':
        this.showCategory = !this.showCategory;
        break;
      case 'tags':
        this.showTags = !this.showTags;
        break;
      case 'price':
        this.showPrice = !this.showPrice;
        break;
      case 'date':
        this.showDate = !this.showDate;
        break;
      // Add more cases if needed
    }
  }

  ngOnInit(): void {
    this.isLoading = true;
  
    this.route.queryParams.subscribe((queryParams: any) => {
      this.searchTerm = queryParams.search || '';
  
      this.productForm.patchValue({
        category: queryParams.category || '',
        tag: queryParams.tag || '',
      });
    });
  
    this.productS.getProducts().subscribe(
      (res: any) => {
        this.products = res.data;
  
        // Apply filtering based on the search term
        if (this.searchTerm) {
          this.filteredProducts = of(
            this.products.filter((product) => this.containsSearchTerm(product))
          );
        } else {
          // Apply filtering based on form values
          this.filteredProducts = this.productForm.valueChanges.pipe(
            startWith(this.productForm.value),
            map(() => this.filterProducts())
          );
        }
  
        this.isLoading = false;
      },
      (err) => {
        console.log(err);
        this.isLoading = false; // Ensure isLoading is set to false in case of an error
      }
    );
  }
  
  public containsSearchTerm(product: any): boolean {
    const lowerCasedSearchTerm = this.searchTerm.toLowerCase();
  
    
    return (
      product.name.toLowerCase().includes(lowerCasedSearchTerm) ||
      product.description.toLowerCase().includes(lowerCasedSearchTerm) ||
      product.discount.toLowerCase().includes(lowerCasedSearchTerm) ||
      product.category.toLowerCase().includes(lowerCasedSearchTerm) ||
      product.tag.toLowerCase().includes(lowerCasedSearchTerm) ||
      product.price.toString().includes(lowerCasedSearchTerm)

    );
  }

  filterProducts() {
    const formData = this.productForm.value;
  
    const filteredProducts = this.products.filter((product) => {
      const priceInRange =
        (!formData.minPrice || product.price >= formData.minPrice) &&
        (!formData.maxPrice || product.price <= formData.maxPrice);
  
      return (
        (!formData.category || product.category === formData.category) &&
        (!formData.tag || product.tag === formData.tag) &&
        priceInRange
      );
    });
  
    // Apply sorting based on the selected option
    return this.sortProducts(filteredProducts, formData.sortOrder);
  }
  
  sortProducts(products: any[], sortOrder: string): any[] {
    switch (sortOrder) {
      case 'asc':
        return products.sort((a, b) => (a.updateDate > b.updateDate ? 1 : -1));
      case 'desc':
        return products.sort((a, b) => (a.updateDate < b.updateDate ? 1 : -1));
      case 'newest':
        return products.sort((a, b) => (new Date(a.updateDate) < new Date(b.updateDate) ? 1 : -1));
      case 'oldest':
        return products.sort((a, b) => (new Date(a.updateDate) > new Date(b.updateDate) ? 1 : -1));
      default:
        return products;
    }
  }
  
  
  checkDateOption(product: any, dateOption: string, addedDate: string): boolean {
    // Implement logic for handling date options
    const currentDate = new Date(addedDate);
    switch (dateOption) {
      case 'lastDay':
        currentDate.setDate(currentDate.getDate() - 1);
        break;
      case 'last2Days':
        currentDate.setDate(currentDate.getDate() - 2);
        break;
      // Add more cases for other options
    }
    // Convert product.addedDate to Date object
    const productDate = new Date(product.addedDate);
    return productDate >= currentDate;
  }
  






  onSubmit() {
    if (this.productForm.valid) {
      this.filteredProducts = this.productForm.valueChanges.pipe(
        startWith(this.productForm.value),
        map(() => this.filterProducts())
      );
    } else {
      console.log('Form is invalid. Please check the fields.');
    }
  }

  public formatPrice(price:any) {
    if (typeof price === 'string') {
      // If the price is a string, check for the presence of '$' symbol.
      if (price.includes('$')) {
        // If '$' is on the left, move it to the right.
        return price.replace('$', '') + '$';
      } else {
        // If '$' is not present, add it to the right.
        return price + '$';
      }
    } else if (typeof price === 'number') {
      // If the price is a number, convert it to a string and add '$' on the right.
      return price.toString() + '$';
    } else {
      // Handle other cases, e.g., when the data is not a string or a number.
      return 'N/A';
    }
  }
  
  public  formatReadableDate(dateString:any) {
    const options:any = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    const date = new Date(dateString);
    return date.toLocaleString('en-US', options);
  }

  // Function to handle clicking the heart icon
  toggleFavoriteIcon(product: any) {
    if (this.productS.isFavorite(product)) {
      this.productS.removeFromFavorites(product);
    } else {
      this.productS.addToFavorites(product);
    }
  }

  // Function to check if a product is a favorite
  isFavorite(product: any): boolean {
    return this.productS.isFavorite(product);
  }

  // Function to handle clicking the cart icon
  toggleCartIcon(product: any) {
    if (this.productS.isInCart(product)) {
      this.productS.removeFromCart(product);
    } else {
      this.productS.addToCart(product);
    }
  }

  // Function to check if a product is in the cart
  isInCart(product: any): boolean {
    return this.productS.isInCart(product);
  }

}
