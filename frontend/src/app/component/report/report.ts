import { Component, OnInit, signal } from '@angular/core';
import { ReportTypeModel } from '../models/reportTypeModel';
import { ReportService } from '../../services/reportService';
import { FormsModule } from '@angular/forms';
import { ReportColumnModel } from '../models/reportColumnModel';

@Component({
  selector: 'app-report',
  imports: [FormsModule],
  templateUrl: './report.html',
  styleUrl: './report.css'
})

export class Report implements OnInit {

  reportTypeData = signal<ReportTypeModel[]>([])
  seletedReportType: number = 0;
  selectedTableContent: string[] = [];
  selectedTypeId: number = 0;
  seletedReportTypeColumnData= signal<ReportColumnModel[]>([]);

  constructor(private reportService: ReportService) { }

  ngOnInit(): void {
    this.getReportType()
    console.log(this.reportTypeData())
  }

  getReportType() {
    this.reportService.getAllReport().subscribe({
      next: (res) => {
        if (res) {
          this.reportTypeData.set(res);
        }
      },
      error: (error) => {
        console.log("error")
      }
    })
  }

  handleGetTableContent(): any {
    if (isNaN(this.selectedTypeId) || this.selectedTypeId == 0) {
      console.log("Select Valid Type")
      return
    }

    this.reportService.getColumnsOfType(this.selectedTypeId).subscribe({
      next: (res) => {
        if (res) {
          console.log(res)
        }
      },
      error: (error) => {
        console.log("error",error)
      }
    })
    console.log(this.selectedTypeId)
  }
}
