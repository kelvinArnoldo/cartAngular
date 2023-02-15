import { product } from '../../../shared/interfaces/product.interce';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductComponent {

  @Input() product!: product;
  @Output() addToCartClick = new EventEmitter<product>();
  
  onClick(): void{
    //console.log(this.product);
    this.addToCartClick.emit(this.product);
  }

}

