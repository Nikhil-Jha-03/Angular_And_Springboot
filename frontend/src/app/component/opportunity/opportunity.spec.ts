import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Opportunity } from './opportunity';

describe('Opportunity', () => {
  let component: Opportunity;
  let fixture: ComponentFixture<Opportunity>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Opportunity]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Opportunity);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
