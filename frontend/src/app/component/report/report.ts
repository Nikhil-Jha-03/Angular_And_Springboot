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
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular';
import type { ColDef } from 'ag-grid-community';


ModuleRegistry.registerModules([AllCommunityModule]);
@Component({
  selector: 'app-report',
  imports: [CommonModule, FormsModule, CdkDrag, CdkDropList, DragDropModule, AgGridAngular],
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

  selectedColumnsForFinalReport: string[] = [];


  colDefs: ColDef[] = [];


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

  // generateColDefs(report: any): ColDef[] {
  //   const defs: ColDef[] = [];

  //   report.sections.forEach((section: any) => {
  //     section.columns.forEach((col: string) => {
  //       const key = `${section.name}.${col}`;

  //       defs.push({
  //         headerName: `${section.name} ${col}`,
  //         valueGetter: (params) => params.data[key],
  //         sortable: true,
  //         filter: true
  //       });
  //     });
  //   });

  //   return defs;
  // }
  // rowData = [
  //   {
  //     "accounts.id": 1,
  //     "accounts.name": "ABC Corp",
  //     "accounts.industry": "Tech",
  //     "accounts.annualRevenue": 500000,

  //     "contact.id": 12,
  //     "contact.firstName": "John",
  //     "contact.lastName": "Doe",
  //     "contact.email": "john@example.com",

  //     "opportunity.id": 20,
  //     "opportunity.name": "Big Deal",
  //     "opportunity.stage": "Closed Won",
  //     "opportunity.amount": 45000,
  //     "opportunity.closeDate": "2024-04-20"
  //   },
  //   {
  //     "accounts.id": 2,
  //     "accounts.name": "XYZ Industries",
  //     "accounts.industry": "Manufacturing",
  //     "accounts.annualRevenue": 900000,

  //     "contact.id": 22,
  //     "contact.firstName": "Priya",
  //     "contact.lastName": "Sharma",
  //     "contact.email": "priya@example.com",

  //     "opportunity.id": 30,
  //     "opportunity.name": "Machine Sale",
  //     "opportunity.stage": "Negotiation",
  //     "opportunity.amount": 120000,
  //     "opportunity.closeDate": "2024-08-11"
  //   },
  //   {
  //     "accounts.id": 3,
  //     "accounts.name": "Digital Solutions",
  //     "accounts.industry": "IT Services",
  //     "accounts.annualRevenue": 250000,

  //     "contact.id": 33,
  //     "contact.firstName": "Rahul",
  //     "contact.lastName": "Patil",
  //     "contact.email": "rahul@example.com",

  //     "opportunity.id": 40,
  //     "opportunity.name": "Website Upgrade",
  //     "opportunity.stage": "Prospecting",
  //     "opportunity.amount": 15000,
  //     "opportunity.closeDate": "2024-09-15"
  //   },
  //   {
  //     "accounts.id": 4,
  //     "accounts.name": "Fresh Mart",
  //     "accounts.industry": "Retail",
  //     "accounts.annualRevenue": 180000,

  //     "contact.id": 44,
  //     "contact.firstName": "Asha",
  //     "contact.lastName": "Verma",
  //     "contact.email": "asha@example.com",

  //     "opportunity.id": 55,
  //     "opportunity.name": "POS System",
  //     "opportunity.stage": "Qualification",
  //     "opportunity.amount": 25000,
  //     "opportunity.closeDate": "2024-10-20"
  //   },
  //   {
  //     "accounts.id": 5,
  //     "accounts.name": "HealthCare Plus",
  //     "accounts.industry": "Medical",
  //     "accounts.annualRevenue": 750000,

  //     "contact.id": 52,
  //     "contact.firstName": "Karan",
  //     "contact.lastName": "Mehta",
  //     "contact.email": "karan@example.com",

  //     "opportunity.id": 66,
  //     "opportunity.name": "Equipment Lease",
  //     "opportunity.stage": "Closed Lost",
  //     "opportunity.amount": 95000,
  //     "opportunity.closeDate": "2024-03-10"
  //   }
  // ];

  rowData: any[] = [];



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



  // function to get the selected columns to make the table data

  selectedFinalColumns(data: string): void {

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
    this.colDefs = []; // Clear previous colDefs
    this.rowData = []; // Clear previous rowData
    

    if (this.finalSelectedTypeId !== "" && this.finalSelectedTypeId.trim() !== "") {
      this.finalSelectData = this.finalReportTypeData.find(
        item => item.apiName === this.finalSelectedTypeId
      ) || this.finalSelectData;
    }

    // this.colDefs = this.generateColDefs(this.finalSelectData);


  }

onColumnSelect(objectName: string, columnName: string, event: any) {
  const checked = event.target.checked;
  const columnKey = `${objectName}.${columnName}`;

  if (checked) {
    if (!this.selectedColumnsForFinalReport.includes(columnKey)) {
      this.selectedColumnsForFinalReport.push(columnKey);
    }
  } else {
    this.selectedColumnsForFinalReport =
      this.selectedColumnsForFinalReport.filter(col => col !== columnKey);
  }

  // ✅ rebuild colDefs every time
  this.colDefs = this.selectedColumnsForFinalReport.map(col => ({
    headerName: col,
    field: col,                // preferred over valueGetter
    sortable: true,
    filter: true
  }));
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