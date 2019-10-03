import { Component, OnInit } from '@angular/core';

import { Product } from './product';
import { ProductService } from '../product.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  data: Product[] = [];
  displayedColumns: string[] = ['prodName', 'prodDesc', 'prodPrice', 'icon-update', 'icon-delete'];
  isLoadingResults = true;
  userEmail: string;

  constructor(private productService: ProductService, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.getProducts();
    this.getUser();
  }

  getUser(): void {
    
    this.authService.user().subscribe(res => {
      var email = res.email;
      this.userEmail = email;
      console.log(email);
      console.log(res);
    }, (err) => {
      console.log(err);
    });
    
  }
  

  getProducts(): void {
    this.productService.getProducts()
      .subscribe(products => {
        this.data = products;
        console.log(this.data);
        this.isLoadingResults = false;
      }, err => {
        console.log(err);
        this.isLoadingResults = false;
      });
  }

  deleteProduct(id:string): void {
    this.productService.deleteProduct(id).subscribe(data => this.refresh(data));
  }

  refresh(data) {
    console.log('data', data);
    this.productService.getProducts().subscribe(data => {
      this.data = data;
    });
  }

}
