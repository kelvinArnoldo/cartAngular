import { product } from '../interfaces/product.interce';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable(
    {providedIn: 'root'}
)

export class ShoppingCartSevice{
    products: product[]= [];

    private cartSubject = new BehaviorSubject<product[]>([]);
    private totalSubject = new BehaviorSubject<number>(0);
    private quantitySubject = new BehaviorSubject<number>(0);


    get totalAction$(): Observable<number>{
        return this.totalSubject.asObservable();
    }

    get quantityAction$(): Observable<number>{
        return this.quantitySubject.asObservable();
    }

    get cartAction$(): Observable<product[]>{
        return this.cartSubject.asObservable();
    }

    updateCart(product: product): void{

        this.addToCart(product);
        this.quantytyProducts();
        this.calcTotal();
    }

    private calcTotal(): void{
        const total = this.products.reduce((acc, prod) => acc += (prod.price * prod.qty), 0);
        this.totalSubject.next(total);
    }

    private quantytyProducts(): void{
        const quantity = this.products.reduce((acc, prod) => acc += prod.qty, 0);
        this.quantitySubject.next(quantity);
    }

    private addToCart(product: product): void{
        const isProductInCart = this.products.find(({id}) => id === product.id);

        if(isProductInCart)
        {
            isProductInCart.qty += 1;
        }
        else{
            // undefined
            this.products.push({... product, qty:1});
        }

        this.cartSubject.next(this.products);
    }

    public resetCart(): void{
        this.cartSubject.next([]);
        this.totalSubject.next(0);
        this.quantitySubject.next(0);
    }

    
}