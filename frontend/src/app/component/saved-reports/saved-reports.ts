import { Component, OnInit, Signal } from '@angular/core';
import { ReportService } from '../../services/reportService';
import { DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SaveReportModel } from '../models/saveReportModel';
import { GetSavedReportModel } from '../models/getSaveReportModel';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-saved-reports',
  imports: [FormsModule],
  templateUrl: './saved-reports.html',
  styleUrl: './saved-reports.css'
})
export class SavedReports implements OnInit {

  savedReportData: GetSavedReportModel[] = [];
  selectedSaveReportId: number | null = null;


  constructor(private repertService: ReportService, private destroyRef: DestroyRef) { }


  ngOnInit(): void {
    this.getSavedReport()
  }

  getSavedReport(): void {
    this.repertService.getSavedReport()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res: GetSavedReportModel[]) => {
          this.savedReportData = res
        },
        error: (error) => {
          console.log(error)
        }
      })
  }

}
