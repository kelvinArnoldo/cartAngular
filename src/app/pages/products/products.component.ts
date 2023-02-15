import { ShoppingCartSevice } from '../../shared/services/shopping-cart.service';
import { product } from '../../shared/interfaces/product.interce';
import { ProducsService } from '../../shared/services/producs.service';
import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products!: product[];

  constructor(private productSvc: ProducsService, private ShoppingCartSvc: ShoppingCartSevice){}

  ngOnInit(): void {
      this.productSvc.getProducts()
      .pipe(
        tap((products: product[]) => this.products = products)
      )
      .subscribe();
  }

  addToCart(product: product): void{
    console.log('Add to cart', product);
    this.ShoppingCartSvc.updateCart(product);

  }

}
