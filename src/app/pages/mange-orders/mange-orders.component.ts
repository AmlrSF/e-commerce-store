import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrdersService } from 'src/app/orders.service';

@Component({
  selector: 'app-mange-orders',
  templateUrl: './mange-orders.component.html',
  styleUrls: ['./mange-orders.component.css']
})
export class MangeOrdersComponent implements OnInit {
  orders: any;
  statusOrder:boolean = false;
  constructor(private orderS:OrdersService,private router: Router,private http: HttpClient){};

  ngOnInit(): void {
    const gettoken = localStorage.getItem('token'); 
    let token = {
      token : gettoken
    }
    try {
      this.http.post(`http://localhost:3000/api/v1/customers/profile`,token).subscribe(
        (res:any)=>{
          console.log(res);
          this.orderS.getOrderById(res.customer._id).subscribe(
            (res) => {
              this.orders = res;
              console.log(this.orders);
              this.statusOrder = true;
            },
            (error) => {
              console.error('Error fetching orders:', error);
            }
          );
        },err=>{
          console.log(err);
          this.router.navigate(['/login']);
        }
      )
    } catch (error) {
      
    }
    
  }

  selectedOrder: any;

  showProductDetails(index: number): void {
    this.selectedOrder = this.orders.orders[index];
  }

  closeProductModal(): void {
    this.selectedOrder = null;
  }

  public  formatReadableDate(dateString:any) {
    const options:any = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    const date = new Date(dateString);
    return date.toLocaleString('en-US', options);
  }


  //=============
  public deleteOrderById(id: string) {
    this.orderS.deleteOrderById(id).subscribe(
      (res) => {
        console.log(res);
        
        this.orders.orders = this.orders.orders.filter((order: any) => order._id !== id);
        this.updateProductQuantities(res,false)
      },
      (err) => {
        console.log(err);
      }
    );
  }
  //it works fine
  private updateProductQuantities(result: any, status?:boolean) {
    for (const updatedProduct of result.order.products) {
      const productId = updatedProduct.product._id;
      const allQuantity = parseInt(updatedProduct.product.quantity, 10);
      const subQuantity = parseInt(updatedProduct.quantity, 10);
      
     

      const newQuantity = status ? allQuantity - subQuantity : allQuantity + subQuantity;
      const updateUrl = `http://localhost:3000/api/v1/products/product/${productId}`;

      console.log(updatedProduct);
      console.log("*************************");
      console.log(newQuantity);
      
      
      
      
      this.http.put(updateUrl, { quantity: newQuantity })
        .subscribe(
          (response:any) => {
            console.log(response);
          },
          (error:any) => {
            if (error.status === 404) {
              console.log('Product not found.');
            } else {
              console.error(error);
            }
          }
        );
    }
  }


  //===============
  public deleteAllOrders() {
    this.orderS.deleteAllOrders().subscribe(
      (res) => {
        console.log(res);
        
        
        this.updateProductQuantitiesV2(res.deletedOrders, false); 
        
        this.orders.orders = [];
      },
      (err) => {
        console.log(err);
      }
    );
  }

  private updateProductQuantitiesV2(orders: any[], status?: boolean) {
    orders.forEach((order: any) => {
      order.products.forEach((updatedProduct: any) => {
        const productId = updatedProduct.product._id;
        const allQuantity = parseInt(updatedProduct.product.quantity, 10);
        const subQuantity = parseInt(updatedProduct.quantity, 10);
        
      

        const newQuantity = status ? allQuantity - subQuantity : allQuantity + subQuantity;
        const updateUrl = `http://localhost:3000/api/v1/products/product/${productId}`;

        console.log(updatedProduct);
        console.log("*************************");
        console.log(newQuantity);
      
      
      
      
        this.http.put(updateUrl, { quantity: newQuantity })
          .subscribe(
            (response:any) => {
              console.log(response);
            },
            (error:any) => {
              if (error.status === 404) {
                console.log('Product not found.');
              } else {
                console.error(error);
              }
            }
          );
      });
    });
  }

}
