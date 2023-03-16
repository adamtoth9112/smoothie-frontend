import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmoothieItemComponent } from './smoothie-item.component';

describe('SmoothieItemComponent', () => {
  let component: SmoothieItemComponent;
  let fixture: ComponentFixture<SmoothieItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmoothieItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmoothieItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
