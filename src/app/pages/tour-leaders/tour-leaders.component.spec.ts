import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TourLeadersComponent } from './tour-leaders.component';

describe('TourLeadersComponent', () => {
  let component: TourLeadersComponent;
  let fixture: ComponentFixture<TourLeadersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TourLeadersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TourLeadersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
