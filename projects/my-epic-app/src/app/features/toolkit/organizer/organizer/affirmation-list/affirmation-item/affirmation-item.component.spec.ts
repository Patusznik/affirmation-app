import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffirmationItemComponent } from './affirmation-item.component';

describe('AffirmationItemComponent', () => {
  let component: AffirmationItemComponent;
  let fixture: ComponentFixture<AffirmationItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AffirmationItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AffirmationItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
