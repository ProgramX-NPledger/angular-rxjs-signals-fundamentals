import { Component, inject, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';

import { NgIf, NgFor, CurrencyPipe } from '@angular/common';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'pm-product-detail',
    templateUrl: './product-detail.component.html',
    standalone: true,
    imports: [NgIf, NgFor, CurrencyPipe]
})
export class ProductDetailComponent implements OnDestroy, OnChanges {

  private productService = inject(ProductService);
  sub!: Subscription;

  ngOnChanges(changes: SimpleChanges): void {
    const id = changes['productId']?.currentValue;
    if (id) {
      this.sub=this.productService.getProduct(id).subscribe({
        next: product => {
          this.product = product;
          this.pageTitle = `Product Detail for: ${this.product.productName}`;
        },
        error: err => this.errorMessage = err
      });
    }
  }
  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
  // Just enough here for the template to compile
  @Input() productId: number = 0;
  errorMessage = '';

  // Product to display
  product: Product | null = null;

  // Set the page title
  pageTitle = this.product ? `Product Detail for: ${this.product.productName}` : 'Product Detail';

  addToCart(product: Product) {
  }
}
