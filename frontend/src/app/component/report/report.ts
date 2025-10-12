import { Component, DestroyRef, OnInit, signal } from '@angular/core';
import { ReportTypeModel } from '../models/reportTypeModel';
import { ReportService } from '../../services/reportService';
import { FormsModule } from '@angular/forms';
import { ReportColumnModel } from '../models/reportColumnModel';
import { ReportRequestModel } from '../models/reportRequestModel';
import { TableData } from '../models/TableDataModel';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-report',
  imports: [FormsModule,CommonModule],
  templateUrl: './report.html',
  styleUrl: './report.css'
})

export class Report implements OnInit {

  reportTypeData = signal<ReportTypeModel[]>([])
  seletedReportType: number = 0;
  selectedTableContent: string[] = [];
  selectedTypeId: number = 0;
  seletedReportTypeColumnData = signal<ReportColumnModel[]>([]);
  actualColumnDataToshow = signal<any[]>([]);
  selectedColumns: ReportRequestModel[] = [];
  selectColumnsData: TableData = {
    columns:[],
    rows:[]
  };

  constructor(private reportService: ReportService , private destroyRef : DestroyRef) { }

  ngOnInit(): void {
    this.getReportType()
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

  handleGetTableContent(): void {
    this.selectedColumns = [];
    this.actualColumnDataToshow.set([])
    this.selectColumnsData.columns = []
    this.selectColumnsData.rows = []
    if (!this.selectedTypeId || isNaN(Number(this.selectedTypeId))) {
      console.log("Select a valid type");
      return;
    }

    const typeId = Number(this.selectedTypeId);

    this.reportService.getColumnsOfType(typeId).subscribe({
      next: (res: ReportColumnModel[]) => {
        if (res) {
          console.log("res", res)
          this.seletedReportTypeColumnData.set(res)
        }
      },
      error: (error) => {
        console.log("error", error)
      }
    })
  }

  addColumnToTableData(data: any): void {
    this.actualColumnDataToshow.update((current) => {
      const exists = current.findIndex(item => item.id === data.id);

      if (exists >= 0) {
        return current.filter(item => item.id !== data.id);
      } else {
        return [...current, data];
      }
    });
  }

  isColumnChecked(id: number): boolean {
    return this.actualColumnDataToshow().some(item => item.id === id)
  }

  getData(): any {
    this.actualColumnDataToshow().forEach(item => {
      if (!this.selectedColumns.includes(item.columnName)) {
        this.selectedColumns.push(item.columnName);
      }
    });

    this.reportService.getReportData(this.selectedTypeId, this.selectedColumns)
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe({
      next: (res:TableData) => {
        this.selectColumnsData.columns =  res.columns
        this.selectColumnsData.rows =  res.rows
      },
      error: (error) => {
        console.log("Error Occured: ", error);
      }
    })
  }
}
