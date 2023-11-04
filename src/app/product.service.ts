import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'http://localhost:3000/api/v1/products';

  constructor(private http: HttpClient) { }

    //get all products
    public getProducts(): Observable<any> {
      return this.http.get(this.apiUrl);
      
    }

// Get favorite items from local storage
getFavorites(): any[] {
  const favoritesJSON = localStorage.getItem('favorites');
  return favoritesJSON ? JSON.parse(favoritesJSON) : [];
}

// Add a product to favorites
addToFavorites(product: any): void {
  const favorites = this.getFavorites();
  const productId = product._id;
  const currentDate = new Date();

  const options:any = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  
  const formattedDate = new Intl.DateTimeFormat('en-US', options).format(currentDate);
  
  const item = {
    id:product._id,
    qte:product.quantity,
    name: product.name,
    image: product.image,
    description: product.description,
    price: product.price,
    discount: product.discount,
    itemDate: formattedDate, 
  };


  if (!favorites.some((favProduct) => favProduct.id === productId)) {
    favorites.push(item);
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }
}

// Remove a product from favorites
removeFromFavorites(product: any): void {
  const favorites = this.getFavorites();
  const productId = product._id;

  const updatedFavorites = favorites.filter((favProduct) => favProduct.id !== productId);
  localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
}

// Check if a product is a favorite
isFavorite(product: any): boolean {
  const favorites = this.getFavorites();
  return favorites.some((favProduct) => favProduct.id === product._id);
}

// Get cart items from local storage
getCartItems(): any[] {
  const cartItemsJSON = localStorage.getItem('cart');
  return cartItemsJSON ? JSON.parse(cartItemsJSON) : [];
}

// Add a product to the cart
addToCart(product: any): void {
  const cartItems = this.getCartItems();
  const productId = product._id;

  const currentDate = new Date();
  const options:any = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  
  const formattedDate = new Intl.DateTimeFormat('en-US', options).format(currentDate);
  
  const item = {
    id:product._id,
    name: product.name,
    qte:product.quantity,
    image: product.image,
    description: product.description,
    price: product.price,
    discount: product.discount,
    itemDate: formattedDate, 
    count:0
  };

  if (!cartItems.some((cartProduct) => cartProduct.id === productId)) {
    cartItems.push(item);
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }
}

// Remove a product from the cart
removeFromCart(product: any): void {
  const cartItems = this.getCartItems();
  const productId = product._id;

  const updatedCart = cartItems.filter((cartProduct) => cartProduct.id !== productId);
  localStorage.setItem('cart', JSON.stringify(updatedCart));
}

// Check if a product is in the cart
isInCart(product: any): boolean {
  const cartItems = this.getCartItems();
  return cartItems.some((cartProduct) => cartProduct.id === product._id);
}
  // Function to return the number of favorite items
  getFavoriteItemCount(): number {
    const favorites = this.getFavorites();
    return favorites.length;
  }

  // Function to return the number of items in the cart
  getCartItemCount(): number {
    const cartItems = this.getCartItems();
    return cartItems.length;
  }

  // Function to calculate the sum of prices for items in the cart
  calculateCartTotal(): number {
    const cartItems = this.getCartItems();
    let total = 0;

    cartItems.forEach(element => {
      const price = parseFloat(element.price.replace('$', ''));
      total += price;
    });
  

    return total;
  }

}
