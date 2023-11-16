import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavsComponent } from './favs.component';

describe('FavsComponent', () => {
  let component: FavsComponent;
  let fixture: ComponentFixture<FavsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FavsComponent]
    });
    fixture = TestBed.createComponent(FavsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
