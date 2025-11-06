import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedReports } from './saved-reports';

describe('SavedReports', () => {
  let component: SavedReports;
  let fixture: ComponentFixture<SavedReports>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SavedReports]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SavedReports);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
