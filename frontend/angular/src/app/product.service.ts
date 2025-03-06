
// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

// interface Product {
//   name: string;
//   description: string;
//   price: number;
//   imageUrl: string;
// }

// @Injectable({
//   providedIn: 'root'
// })
// export class ProductService {
//   private apiUrl = 'http://localhost:5052/products'; // Ensure this is correct and matches your backend URL

//   constructor(private http: HttpClient) {}

//   // Fetch all products
//   getProducts(): Observable<Product[]> {
//     return this.http.get<Product[]>(this.apiUrl);
//   }

//   // Fetch product by name
//   getProductByName(name: string): Observable<Product | undefined> {
//     return this.getProducts().pipe(
//       map(products => products.find(product => product.name === name))
//     );
//   }
// }

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface Product {
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:5052/products'; // Update this if your API URL is different

  constructor(private http: HttpClient) { }

  // Fetch products
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  // // Fetch product by name
  // getProductByName(name: string): Observable<Product | undefined> {
  //   return this.getProducts().pipe(
  //     map((products: Product[]) => products.find(product => product.name === name))
  //   );
  // }

  getProductByName(name: string): Observable<Product | undefined> {
    return this.getProducts().pipe(
      map(products => {
        const product = products.find(product => product.name === name);
        if (!product) {
          console.error(`Product with name ${name} not found`);
        }
        return product;
      })
    );
  }
  
}

