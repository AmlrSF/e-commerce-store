import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/orders.service';

@Component({
  selector: 'app-mange-orders',
  templateUrl: './mange-orders.component.html',
  styleUrls: ['./mange-orders.component.css']
})
export class MangeOrdersComponent implements OnInit {
  orders: any;
  statusOrder:boolean = false;
  constructor(private orderS:OrdersService){};

  ngOnInit(): void {
      this.orderS.getOrderById("6547ee2d542e6d53e008cef5").subscribe(
      (res) => {
        this.orders = res;
        console.log(this.orders);
        this.statusOrder = true;
      },
      (error) => {
        console.error('Error fetching orders:', error);
      }
    );
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

  public deleteAllOrders() {
    this.orderS.deleteAllOrders().subscribe(
      (res) => {
        console.log(res);
        
        this.orders.orders = [];
      },
      (err) => {
        console.log(err);
      }
    );
  }
  

  public deleteOrderById(id: string) {
    this.orderS.deleteOrderById(id).subscribe(
      (res) => {
        console.log(res);
        
        this.orders.orders = this.orders.orders.filter((order: any) => order._id !== id);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  



}
