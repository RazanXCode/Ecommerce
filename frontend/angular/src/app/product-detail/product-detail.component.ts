import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';
import { CommonModule } from '@angular/common';

interface Product {
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: Product | undefined;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    // Subscribe to the paramMap to listen for changes in the route params
    this.route.paramMap.subscribe(params => {
      const productName = params.get('name');
      if (productName) {
        console.log(`Product name from URL: ${productName}`); // Log to verify the name
        this.productService.getProductByName(productName).subscribe(data => {
          if (data) {
            this.product = data;
            console.log('Product found:', data); // Log the fetched product
          } else {
            console.log('Product not found');
          }
        });
      } else {
        console.log('No product name in the route');
      }
    });
  }
}
