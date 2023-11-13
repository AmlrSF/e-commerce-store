import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-developer',
  templateUrl: './developer.component.html',
  styleUrls: ['./developer.component.css']
})
export class DeveloperComponent {

  apiList = [
    { label: 'Get All products', method: 'GET', url: 'http://localhost:3000/api/v1/products', color: '#61affe', isCopied: false },
    { label: 'Create a product', method: 'POST', url: 'http://localhost:3000/api/v1/products', color: '#49cc90', isCopied: false },
    { label: 'Delete all products', method: 'DELETE', url: 'http://localhost:3000/api/v1/products', color: '#f93e3e', isCopied: false },
    { label: 'Update a product by Id', method: 'PUT', url: 'http://localhost:3000/api/v1/products/product/:id', color: '#fca130', isCopied: false },
    { label: 'Get a product by Id', method: 'GET', url: 'http://localhost:3000/api/v1/products/product/:id', color: '#61affe', isCopied: false },
    { label: 'Delete a product by id', method: 'DELETE', url: 'http://localhost:3000/api/v1/products/product/:id', color: '#f93e3e', isCopied: false }
  ];
  
  ordersList = [
    { label: 'Get All orders', method: 'GET', url: 'http://localhost:3000/api/v1/orders', color: '#61affe', isCopied: false },
    { label: 'Post an order', method: 'POST', url: 'http://localhost:3000/api/v1/orders', color: '#49cc90', isCopied: false },
    { label: 'Delete all orders', method: 'DELETE', url: 'http://localhost:3000/api/v1/orders', color: '#f93e3e', isCopied: false },
    { label: 'Update an order by Id', method: 'PUT', url: 'http://localhost:3000/api/v1/orders/:id', color: '#fca130', isCopied: false },
    { label: 'Get an order by Id', method: 'GET', url: 'http://localhost:3000/api/v1/orders/:id', color: '#61affe', isCopied: false },
    { label: 'Delete an order by id', method: 'DELETE', url: 'http://localhost:3000/api/v1/orders/:id', color: '#f93e3e', isCopied: false }
  ];

  listCustomers = [
    { label: 'Create a customer', method: 'POST', url: 'http://localhost:3000/api/v1/customers', color: '#49cc90', isCopied: false },
  ];
  
  copyLink(api: any) {
    const el = document.createElement('textarea');
    el.value = api.url;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);

    api.isCopied = true;

    setTimeout(() => {
      api.isCopied = false;
    }, 3000);
  }

}
