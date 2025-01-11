import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedGaragesComponent } from './saved-garages.component';

describe('SavedGaragesComponent', () => {
  let component: SavedGaragesComponent;
  let fixture: ComponentFixture<SavedGaragesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SavedGaragesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SavedGaragesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
