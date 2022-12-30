import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScafoldMainMenuComponent } from './scafold-main-menu.component';

describe('ScafoldMainMenuComponent', () => {
  let component: ScafoldMainMenuComponent;
  let fixture: ComponentFixture<ScafoldMainMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ScafoldMainMenuComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScafoldMainMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
