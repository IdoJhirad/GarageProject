import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiSelectGaragesComponent } from './multi-select-garages.component';

describe('MultiSelectGaragesComponent', () => {
  let component: MultiSelectGaragesComponent;
  let fixture: ComponentFixture<MultiSelectGaragesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MultiSelectGaragesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultiSelectGaragesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
