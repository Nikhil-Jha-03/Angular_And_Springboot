import {
  Component,
  DestroyRef,
  OnInit,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  CdkDrag,
  CdkDropList,
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  DragDropModule
} from '@angular/cdk/drag-drop';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ReportService } from '../../services/reportService';
import { ReportTypeModel } from '../models/reportTypeModel';
import { ReportColumnModel } from '../models/reportColumnModel';
import { TableData } from '../models/TableDataModel';
import { ReportRequestModel } from '../models/reportRequestModel';
import { filterModel } from '../models/filterModel';
import { ApplyFilter } from '../models/applyfilter';
import { filterRequestReport } from '../models/filterReportRequest';
import { SaveReportModel } from '../models/saveReportModel';
import { ReportMetadata } from '../models/FinalMetaDataTypeModel';
import { FinalReportRequestModel } from '../models/FinalReportRequestModel';

@Component({
  selector: 'app-report',
  imports: [CommonModule, FormsModule, CdkDrag, CdkDropList, DragDropModule],
  templateUrl: './report.html',
  styleUrl: './report.css'
})
export class Report implements OnInit {
  reportTypeData = signal<ReportTypeModel[]>([]);
  selectedTypeId: number = 0;
  reportName: string = ''

  availableColumns = signal<ReportColumnModel[]>([]);
  selectedColumns = signal<ReportColumnModel[]>([]);

  tableData: TableData = { columns: [], rows: [] };

  filters: ApplyFilter[] = [];
  filterData: filterModel[] = [];
  filterIdCounter = 0;
  showFilter: boolean = false;



  // For final report
  finalReportTypeData: FinalReportRequestModel[] = [];
  finalSelectedTypeId: string = '';
  finalSelectData: FinalReportRequestModel = {
    name: "",
    apiName: "",
    primaryObject: "",
    secondaryObject: "",
    tertiaryObject: "",
    joinQuery: [{
      id: "",
      fromObject: "",
      fromField: "",
      toObject: "",
      toField: "",
      joinType: "LEFT"
    }],
    sections: [{
      name: "",
      columns: [""]
    }],
  }


  constructor(
    private reportService: ReportService,
    private destroyRef: DestroyRef
  ) { }

  ngOnInit(): void {
    this.getAllSavedReport()
    this.filters = [];
    this.loadReportTypes();
    this.getFilters();
  }

  // Get Saved Report
  getAllSavedReport(): any {
    this.reportService.getAllSavedReport().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (res: FinalReportRequestModel[]) => {
        this.finalReportTypeData = res;
      },
      error: (error) => {
        console.log(error)
      }
    })

    return null;
  }

  // Select The report type and load the value into the variable
  loadSelectedData(): any {

    if (this.finalSelectedTypeId !== "" && this.finalSelectedTypeId.trim() !== "") {
      this.finalSelectData = this.finalReportTypeData.find(
        item => item.apiName === this.finalSelectedTypeId
      ) || this.finalSelectData;
    }
    console.log(this.finalSelectData)
  }

  onColumnSelect(objectName: string, columnName: string, event: any) {
  const checked = event.target.checked;
  console.log(objectName, columnName, checked);

  // You can store selected columns however you want:
  // Example:
  // this.selectedColumns.push({ objectName, columnName, checked });
}







  private createEmptyFilter(): ApplyFilter {
    return {
      id: this.filterIdCounter++,
      accountId: null,
      columnName: '',
      operators: '',
      value: '',
      logicalOperator: "AND"
    };
  }

  addFilter(): void {
    this.filters = [...this.filters, this.createEmptyFilter()];
    const data = this.selectedColumns().map(e => e.columnName)
  }

  filterChange(index: number, field: keyof ApplyFilter, event: any): void {
    const value = event.target as HTMLSelectElement
    const eventValue = value.value;

    this.filters[index] = {
      ...this.filters[index],
      accountId: Number(this.selectedTypeId),
      [field]: eventValue
    }
  }

  removeFilter(deleteid: number): void {
    if (deleteid >= 0) {
      this.filters.splice(deleteid, 1)
    }
  }


  getFilterReport(): any {
    const validFilters = this.filters.filter(f =>
      f.columnName?.trim() !== '' &&
      f.operators?.trim() !== '' &&
      f.value !== null &&
      f.value !== undefined &&
      f.value !== '' &&
      f.logicalOperator === "AND" ||
      f.logicalOperator === "OR"

    );

    const tableName = this.reportTypeData().filter(item => item.id == Number(this.selectedTypeId))[0].primaryObject

    if (!tableName) {
      alert('Please add at least one complete filter');
      return;
    }
    if (validFilters.length === 0) {
      alert('Please add at least one complete filter');
      return;
    }

    const request: filterRequestReport = {
      tableName: tableName,
      selectedColumns: this.selectedColumns().map(e => e.columnName),
      filters: validFilters
    }

    console.log("request", request)

    this.reportService.getReportWithFilter(request).pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res: any) => {
          this.showFilter = true;
          this.tableData.columns = this.selectedColumns();
          this.tableData.rows = res;
        },
        error: (error) => {
          console.log(error)
        }
      })
  }

  toggleFilter(): void {
    this.showFilter = false
    this.tableData.rows = []
  }

  loadReportTypes(): void {
    this.reportService.getAllReport().subscribe({
      next: (res) => this.reportTypeData.set(res || []),
      error: () => console.error('Error fetching report types')
    });
  }

  loadColumns(): void {
    this.availableColumns.set([]);
    this.selectedColumns.set([]);
    this.tableData = { columns: [], rows: [] };

    if (!this.selectedTypeId) return;

    this.reportService.getColumnsOfType(this.selectedTypeId).subscribe({
      next: (cols: ReportColumnModel[]) => this.availableColumns.set(cols || []),
      error: (err) => console.error('Error loading columns', err)
    });
  }

  toggleColumn(col: ReportColumnModel): void {
    const isSelected = this.isSelected(col.id);
    if (isSelected) {
      this.selectedColumns.update((list) => list.filter((c) => c.id !== col.id));
    } else {
      this.selectedColumns.update((list) => [...list, col]);
    }
  }

  isSelected(id: number): boolean {
    return this.selectedColumns().some((c) => c.id === id);
  }

  fetchData(): void {
    const columnNames = this.selectedColumns().map((c) => c.columnName);

    // Wrap it in a single object matching ReportRequestModel
    const requestBody: ReportRequestModel = {
      selectedColumns: columnNames
    };
    if (!requestBody.selectedColumns.length) return;

    this.reportService.getReportData(this.selectedTypeId, requestBody)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res: TableData) => (this.tableData = res),
        error: (err) => console.error('Error fetching data', err)
      });
  }

  getFilters(): void {
    this.reportService.getFilter().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (res: filterModel[]) => {
        res.forEach(item => this.filterData.push(item))
      },
      error: (err) => {
        console.log(err)
      }
    })

  }

  onDrop(event: CdkDragDrop<ReportColumnModel[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      const draggedItem = event.previousContainer.data[event.previousIndex];
      // Prevent duplicates in target
      const alreadyExists = event.container.data.some(
        item => item.id === draggedItem.id
      );

      if (event.container.connectedTo.toString() === 'selectedList') {
        this.selectedColumns.update(list => list.filter(c => c.id !== draggedItem.id));
      }

      if (!alreadyExists) {
        // Push a copy into the new container
        event.container.data.splice(event.currentIndex, 0, { ...draggedItem });
        // event.previousContainer.data.splice(event.previousIndex, 1);
      }
    }
  }

  saveReport(): void {

    const validFilters = this.filters.filter(f =>
      f.columnName?.trim() !== '' &&
      f.operators?.trim() !== '' &&
      f.value !== null &&
      f.value !== undefined &&
      f.value !== ''
    );

    const tableName = this.reportTypeData().filter(item => item.id == Number(this.selectedTypeId))[0].primaryObject

    if (!tableName) {
      alert('Please add at least one complete filter');
      return;
    }
    if (validFilters.length === 0) {
      alert('Please add at least one complete filter');
      return;
    }

    const data: SaveReportModel = {
      reportName: this.reportName,
      tableName: tableName,
      selectedCloumns: this.selectedColumns().map(e => e.columnName),
      appliedfilter: validFilters
    }


    this.reportService.saveReport(data).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (res) => {
        alert(`Report With Name: ${this.reportName} Saved`)
      },
      error: (err) => {
        console.log(err)
      }
    })

    console.log(data)

  }

}