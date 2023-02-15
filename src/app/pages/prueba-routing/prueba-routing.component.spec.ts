import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PruebaRoutingComponent } from './prueba-routing.component';

describe('PruebaRoutingComponent', () => {
  let component: PruebaRoutingComponent;
  let fixture: ComponentFixture<PruebaRoutingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PruebaRoutingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PruebaRoutingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
