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
    { label: 'Register a customer', method: 'POST', url: 'http://localhost:3000/api/v1/customers/register', color: '#61affe', isCopied: false },
    { label: 'Login a customer', method: 'POST', url: 'http://localhost:3000/api/v1/customers/login', color: '#49cc90', isCopied: false },
    { label: 'Get customer profile', method: 'POST', url: 'http://localhost:3000/api/v1/customers/profile', color: '#f93e3e', isCopied: false },
    { label: 'Update customer by Id', method: 'PUT', url: 'http://localhost:3000/api/v1/customers/:id', color: '#fca130', isCopied: false },
    { label: 'Get customer by Id', method: 'GET', url: 'http://localhost:3000/api/v1/customers/:id', color: '#61affe', isCopied: false },
    { label: 'Delete customer by Id', method: 'DELETE', url: 'http://localhost:3000/api/v1/customers/:id', color: '#f93e3e', isCopied: false },
    { label: 'Get all customers', method: 'GET', url: 'http://localhost:3000/api/v1/customers', color: '#49cc90', isCopied: false }
  ];

  listBillboard = [
    { label: 'Get all billboards', method: 'GET', url: 'http://localhost:3000/api/v1/billboards', color: '#61affe', isCopied: false },
    { label: 'Create a new billboard', method: 'POST', url: 'http://localhost:3000/api/v1/billboards', color: '#49cc90', isCopied: false },
    { label: 'Delete all billboards', method: 'DELETE', url: 'http://localhost:3000/api/v1/billboards', color: '#f93e3e', isCopied: false },
    { label: 'Delete a billboard by Id', method: 'DELETE', url: 'http://localhost:3000/api/v1/billboards/:id', color: '#f93e3e', isCopied: false },
    { label: 'Get a billboard by Id', method: 'GET', url: 'http://localhost:3000/api/v1/billboards/:id', color: '#61affe', isCopied: false },
    { label: 'Update a billboard by Id', method: 'PUT', url: 'http://localhost:3000/api/v1/billboards/:id', color: '#fca130', isCopied: false }
  ];
  
  
   listCategory = [
    { label: 'Get all categories', method: 'GET', url: 'http://localhost:3000/api/v1/categories', color: '#61affe', isCopied: false },
    { label: 'Create a new category', method: 'POST', url: 'http://localhost:3000/api/v1/categories', color: '#49cc90', isCopied: false },
    { label: 'Delete all categories', method: 'DELETE', url: 'http://localhost:3000/api/v1/categories', color: '#f93e3e', isCopied: false },
    { label: 'Get a category by Id', method: 'GET', url: 'http://localhost:3000/api/v1/categories/:id', color: '#61affe', isCopied: false },
    { label: 'Update a category by Id', method: 'PUT', url: 'http://localhost:3000/api/v1/categories/:id', color: '#fca130', isCopied: false },
    { label: 'Delete a category by Id', method: 'DELETE', url: 'http://localhost:3000/api/v1/categories/:id', color: '#f93e3e', isCopied: false }
  ];
  

  listTags = [
    { label: 'Get all tags', method: 'GET', url: 'http://localhost:3000/api/v1/tags', color: '#61affe', isCopied: false },
    { label: 'Create a new tag', method: 'POST', url: 'http://localhost:3000/api/v1/tags', color: '#49cc90', isCopied: false },
    { label: 'Delete all tags', method: 'DELETE', url: 'http://localhost:3000/api/v1/tags', color: '#f93e3e', isCopied: false },
    { label: 'Get a tag by Id', method: 'GET', url: 'http://localhost:3000/api/v1/tags/:id', color: '#61affe', isCopied: false },
    { label: 'Update a tag by Id', method: 'PUT', url: 'http://localhost:3000/api/v1/tags/:id', color: '#fca130', isCopied: false },
    { label: 'Delete a tag by Id', method: 'DELETE', url: 'http://localhost:3000/api/v1/tags/:id', color: '#f93e3e', isCopied: false }
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
