
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

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
  private apiUrl = 'http://localhost:5052/products'; 

  constructor(private http: HttpClient) { }

  // Fetch all products with error handling
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl).pipe(
      catchError(this.handleError) 
    );
  }

  // Fetch a product by name 
  getProductByName(name: string): Observable<Product | undefined> {
    return this.getProducts().pipe(
      map(products => {
        const product = products.find(product => product.name === name);
        if (!product) {
          console.error(`Product with name ${name} not found`);
        }
        return product;
      }),
      catchError(this.handleError)
    );
  }

  //error handling function
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Client-side error: ${error.error.message}`;
    } else {
      // Server-side error
      switch (error.status) {
        case 404:
          errorMessage = 'Error 404: The requested resource was not found.';
          break;
        case 500:
          errorMessage = 'Error 500: Internal server error. Please try again later.';
          break;
        default:
          errorMessage = `Server returned code ${error.status}: ${error.message}`;
      }
    }

    console.error(errorMessage);
    return throwError(() => new Error(errorMessage)); 
  }
}
  