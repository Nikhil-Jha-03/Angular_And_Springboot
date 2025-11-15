import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalReportGenerationAndSave } from './final-report-generation-and-save';

describe('FinalReportGenerationAndSave', () => {
  let component: FinalReportGenerationAndSave;
  let fixture: ComponentFixture<FinalReportGenerationAndSave>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinalReportGenerationAndSave]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinalReportGenerationAndSave);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
