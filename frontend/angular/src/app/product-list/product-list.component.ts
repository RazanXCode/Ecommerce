// // import { Component } from '@angular/core';

// // @Component({
// //   selector: 'app-product-list',
// //   standalone:true,
// //   imports: [],
// //   templateUrl: './product-list.component.html',
// //   styleUrl: './product-list.component.css'
// // })
// // export class ProductListComponent {

// // }

// //-------------------------------------

// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { ProductService } from '../product.service';

// interface Product {
//   name: string;
//   price: number;
// }

// @Component({
//   selector: 'app-product-list',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './product-list.component.html',
//   styleUrl: './product-list.component.css'
// })
// export class ProductListComponent implements OnInit {
//   products: Product[] = [];

//   constructor(private productService: ProductService) {}

//   ngOnInit(): void {
//     this.productService.getProducts().subscribe(data => {
//       this.products = data;
//     });
//   }
//--------------------------------------------------
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProductService } from '../product.service';

interface Product {
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
    });
  }

  viewDetails(product: Product): void {
    this.router.navigate(['/product', product.name]);
  }
}

