import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BestSellersComponent } from './best-sellers.component';

describe('BestSellersComponent', () => {
  let component: BestSellersComponent;
  let fixture: ComponentFixture<BestSellersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BestSellersComponent]
    });
    fixture = TestBed.createComponent(BestSellersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
