import { ShoppingCartSevice } from '../../../shared/services/shopping-cart.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  total$ = this.shoopingCartSvc.totalAction$;
  cart$ = this.shoopingCartSvc.cartAction$;
  constructor(private shoopingCartSvc: ShoppingCartSevice) {}

  ngOnInit(): void {
      
  }

}
