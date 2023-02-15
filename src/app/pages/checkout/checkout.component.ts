import { ProducsService } from './../../shared/services/producs.service';
import { Router } from '@angular/router';
import { ShoppingCartSevice } from 'src/app/shared/services/shopping-cart.service';
import { product } from '../../shared/interfaces/product.interce';
import { Order, Details } from './../../shared/interfaces/order.interface';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { delay, switchMap, tap } from 'rxjs';
import { Store } from 'src/app/shared/interfaces/stores.interface';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  constructor(private dataSvc: DataService, 
    private shoppinCartSvc: ShoppingCartSevice,
    private route: Router,
    private productSvc: ProducsService){}

  model = {
    name:'',
    store: '',
    shippingAddress: '',
    city: ''
  };

  isDelivery = true;
  cart: product[] = [];
  stores: Store[] = [];

  onPickupOrDelivery(value: boolean): void{
    this.isDelivery = value;
  }

  onSubmit({value:formData}: NgForm){
    console.log('Guardar', formData);
    const data: Order ={
      ... formData,
      date: '',
      isDelivery: this.isDelivery
    }

    this.dataSvc.saveOrder(data).pipe(
      tap(res => console.log(res)),
      switchMap(({id:orderId}) => { 
        const details = this.prepareDetails();  
        return this.dataSvc.saveDetailsOrder({details, orderId});
      }),
      tap(( ) => this.route.navigate(['/checkout/thank-you-page'])),
      delay(2000),
      tap(() => this.shoppinCartSvc.resetCart())
    ).subscribe();
    
  }

  private getStores(): void{
    this.dataSvc.getStores()
    .pipe(
      tap((stores: Store[]) => this.stores = stores)
    ).subscribe()
  }

  ngOnInit(): void {
    this.getStores();
    this.getDataCart();
    this.prepareDetails();
  }

  private getCurrenDaty(): string{
    return new Date().toLocaleDateString();
  }

  private prepareDetails(): Details[]{
    const details: Details[] = [];
    this.cart.forEach((product: product) => {
      const {id:productId, name:productName, qty:quantity, stock} = product;
      const updateStock = (stock - quantity);
      this.productSvc.updateStock(productId, updateStock)
      .pipe(
        tap(() => details.push({productId, productName, quantity}))
      )
      .subscribe();

    })

    return details;
    
  }

  private getDataCart(): void{
    this.shoppinCartSvc.cartAction$.pipe(
      tap((products: product[]) => this.cart = products)
    ).subscribe();
  }

}
