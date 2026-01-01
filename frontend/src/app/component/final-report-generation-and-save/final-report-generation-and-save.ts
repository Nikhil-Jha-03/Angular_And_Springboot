import { Component, DestroyRef, OnInit, signal } from '@angular/core';
import { ReportMetadata } from '../models/FinalMetaDataTypeModel';
import { ReportService } from '../../services/reportService';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ReportTypeModel } from '../models/reportTypeModel';
import { ReportColumnModel } from '../models/reportColumnModel';
import { FormsModule } from '@angular/forms';
import { FinalReportRequestModel } from '../models/FinalReportRequestModel';

@Component({
  selector: 'app-final-report-generation-and-save',
  imports: [FormsModule],
  templateUrl: './final-report-generation-and-save.html',
  styleUrl: './final-report-generation-and-save.css'
})
export class FinalReportGenerationAndSave implements OnInit {

  reportMetadata: ReportMetadata = {
    name: '',
    apiName: '',
    primaryObject: '',
    secondaryObject: '',
    tertiaryObject: '',
    joinQuery: [
      {
        id: this.generateId(),
        fromObject: '',
        fromField: '',
        toObject: '',
        toField: '',
        joinType: 'LEFT'
      }
    ],
    columns: {
      primary: [],
      secondary: [],
      tertiary: []
    }
  };

  reportTypeData = signal<ReportTypeModel[]>([]);

  primayObjectColumn = signal<ReportColumnModel[]>([]);
  secondaryObjectColumn = signal<ReportColumnModel[]>([]);
  tertiaryObjectColumn = signal<ReportColumnModel[]>([]);

  primayObjectColumnEdit = signal<ReportColumnModel[]>([]);
  secondaryObjectColumnEdit = signal<ReportColumnModel[]>([]);
  tertiaryObjectColumnEdit = signal<ReportColumnModel[]>([]);

  showForm = false;

  finalSelectedTypeId: string = '';
  finalReportTypeData: FinalReportRequestModel[] = [];
  finalSelectData: FinalReportRequestModel = {
    name: "",
    apiName: "",
    primaryObject: "",
    secondaryObject: "",
    tertiaryObject: "",
    joinQuery: [],
    sections: [],
  }

  constructor(
    private reportService: ReportService,
    private destroyRef: DestroyRef
  ) { }

  ngOnInit(): void {
    this.loadReportTypes();
    this.getAllSavedReport();
  }

  // EDIT REPORT SECTION 

  getAllSavedReport(): void {
    this.reportService.getAllSavedReport()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res: FinalReportRequestModel[]) => {
          this.finalReportTypeData = res;
        },
        error: (error) => {
          console.error('Error fetching saved reports:', error);
          alert('Failed to load saved reports');
        }
      });
  }

  loadSelectedData(): void {
    if (!this.finalSelectedTypeId || this.finalSelectedTypeId.trim() === "") {
      return;
    }

    const selectedReport = this.finalReportTypeData.find(
      item => item.apiName === this.finalSelectedTypeId
    );

    if (selectedReport) {
      this.finalSelectData = JSON.parse(JSON.stringify(selectedReport)); // Deep copy
      this.loadColumnsForEditObject();
    }
  }

  loadColumnsForEditObject(): void {
    // Load columns based on the objects in the selected report
    if (this.finalSelectData.primaryObject) {
      this.loadColumnsByObjectName(this.finalSelectData.primaryObject, cols => this.primayObjectColumnEdit.set(cols));
    }
    if (this.finalSelectData.secondaryObject) {
      this.loadColumnsByObjectName(this.finalSelectData.secondaryObject, cols => this.secondaryObjectColumnEdit.set(cols));
    }
    if (this.finalSelectData.tertiaryObject) {
      this.loadColumnsByObjectName(this.finalSelectData.tertiaryObject, cols => this.tertiaryObjectColumnEdit.set(cols));
    }
  }

  editAddJoin(): void {
    if (!this.finalSelectData.joinQuery) {
      this.finalSelectData.joinQuery = [];
    }
    this.finalSelectData.joinQuery.push({
      id: this.generateId(),
      fromObject: '',
      fromField: '',
      toObject: '',
      toField: '',
      joinType: 'LEFT'
    });
  }

  editRemoveJoin(index: number): void {
    this.finalSelectData.joinQuery?.splice(index, 1);
  }

  editAddColumn(sectionName: string, columnValue: string): void {
    if (!columnValue || columnValue.trim() === '') return;

    const section = this.finalSelectData.sections?.find(s => s.name === sectionName);
    
    if (section) {
      // Check for duplicates
      if (!section.columns.includes(columnValue)) {
        section.columns.push(columnValue);
      }
    } else {
      // Create new section if it doesn't exist
      if (!this.finalSelectData.sections) {
        this.finalSelectData.sections = [];
      }
      this.finalSelectData.sections.push({
        name: sectionName,
        columns: [columnValue]
      });
    }
  }

  editRemoveColumn(section: any, index: number): void {
    section.columns.splice(index, 1);
  }

  getColumnsBySection(sectionName: string): ReportColumnModel[] {
    const found = this.reportTypeData().find(item => item.primaryObject === sectionName);
    
    if (!found) return [];

    // Return the appropriate column list based on which object it is
    if (sectionName === this.finalSelectData.primaryObject) {
      return this.primayObjectColumnEdit();
    }
    if (sectionName === this.finalSelectData.secondaryObject) {
      return this.secondaryObjectColumnEdit();
    }
    if (sectionName === this.finalSelectData.tertiaryObject) {
      return this.tertiaryObjectColumnEdit();
    }
    
    return [];
  }

  saveEditReport(): void {
    // Validation
    if (!this.finalSelectData.name || !this.finalSelectData.apiName) {
      alert('Please fill in required fields: Name and API Name');
      return;
    }

    if (!this.finalSelectData.primaryObject) {
      alert('Primary Object is required');
      return;
    }

    // Clean up empty sections
    this.finalSelectData.sections = this.finalSelectData.sections?.filter(
      section => section.columns && section.columns.length > 0
    ) || [];

    this.reportService.saveEditReportType(this.finalSelectData)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          alert('Report updated successfully');
          this.getAllSavedReport(); // Refresh the list
          this.resetEditForm();
        },
        error: (error) => {
          console.error('Error saving report:', error);
          alert('Failed to save report: ' + (error.message || 'Unknown error'));
        }
      });
  }

  resetEditForm(): void {
    this.finalSelectedTypeId = '';
    this.finalSelectData = {
      name: "",
      apiName: "",
      primaryObject: "",
      secondaryObject: "",
      tertiaryObject: "",
      joinQuery: [],
      sections: [],
    };
  }

  // CREATE REPORT SECTION 

  loadReportTypes(): void {
    this.reportService.getAllReport()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          this.reportTypeData.set(res || []);
        },
        error: (error) => {
          console.error('Error fetching report types:', error);
        }
      });
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
    if (!this.showForm) {
      this.resetCreateForm();
    }
  }

  resetCreateForm(): void {
    this.reportMetadata = {
      name: '',
      apiName: '',
      primaryObject: '',
      secondaryObject: '',
      tertiaryObject: '',
      joinQuery: [{
        id: this.generateId(),
        fromObject: '',
        fromField: '',
        toObject: '',
        toField: '',
        joinType: 'LEFT'
      }],
      columns: {
        primary: [],
        secondary: [],
        tertiary: []
      }
    };
    this.primayObjectColumn.set([]);
    this.secondaryObjectColumn.set([]);
    this.tertiaryObjectColumn.set([]);
  }

  private loadColumns(objectName: string, setter: (cols: ReportColumnModel[]) => void): void {
    if (!objectName || objectName.trim() === '') return;

    const found = this.reportTypeData().find(item => item.primaryObject === objectName);
    if (!found?.id) return;

    this.reportService.getColumnsOfType(found.id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (cols: ReportColumnModel[]) => {
          setter(cols || []);
        },
        error: (err) => console.error('Error loading columns', err)
      });
  }

  private loadColumnsByObjectName(objectName: string, setter: (cols: ReportColumnModel[]) => void): void {
    if (!objectName || objectName.trim() === '') return;

    const found = this.reportTypeData().find(item => item.primaryObject === objectName);
    if (!found?.id) return;

    this.reportService.getColumnsOfType(found.id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (cols: ReportColumnModel[]) => {
          setter(cols || []);
        },
        error: (err) => console.error('Error loading columns', err)
      });
  }

  onObjectChange(object: string): void {
    switch (object) {
      case "primaryObject":
        this.loadColumns(this.reportMetadata.primaryObject, cols => this.primayObjectColumn.set(cols));
        break;
      case "secondaryObject":
        this.loadColumns(this.reportMetadata.secondaryObject, cols => this.secondaryObjectColumn.set(cols));
        break;
      case "tertiaryObject":
        this.loadColumns(this.reportMetadata.tertiaryObject, cols => this.tertiaryObjectColumn.set(cols));
        break;
      default:
        console.warn('Unknown object type:', object);
    }
  }

  onColumnSelect(event: Event, data: ReportColumnModel, objectType: 'primary' | 'secondary' | 'tertiary'): void {
    const checked = (event.target as HTMLInputElement).checked;

    if (checked) {
      this.addColumn(data, objectType);
    } else {
      this.removeColumn(data, objectType);
    }
  }

  addColumn(data: ReportColumnModel, type: 'primary' | 'secondary' | 'tertiary'): void {
    if (!this.reportMetadata.columns[type].includes(data.columnName)) {
      this.reportMetadata.columns[type].push(data.columnName);
    }
  }

  removeColumn(data: ReportColumnModel, type: 'primary' | 'secondary' | 'tertiary'): void {
    this.reportMetadata.columns[type] = this.reportMetadata.columns[type].filter(
      col => col !== data.columnName
    );
  }

  private generateId(): string {
    return 'join_' + Math.random().toString(36).substr(2, 9);
  }

  addJoin(): void {
    this.reportMetadata.joinQuery.push({
      id: this.generateId(),
      fromObject: '',
      fromField: '',
      toObject: '',
      toField: '',
      joinType: 'LEFT'
    });
  }

  removeJoin(id: string): void {
    this.reportMetadata.joinQuery = this.reportMetadata.joinQuery.filter(item => item.id !== id);
  }

  getColumnsFor(objectName: string): ReportColumnModel[] {
    if (objectName === this.reportMetadata.primaryObject) {
      return this.primayObjectColumn();
    }
    if (objectName === this.reportMetadata.secondaryObject) {
      return this.secondaryObjectColumn();
    }
    if (objectName === this.reportMetadata.tertiaryObject) {
      return this.tertiaryObjectColumn();
    }
    return [];
  }

  saveReport(): void {
    // Validation
    if (!this.reportMetadata.name || !this.reportMetadata.apiName) {
      alert('Please fill in required fields: Name and API Name');
      return;
    }

    if (!this.reportMetadata.primaryObject) {
      alert('Primary Object is required');
      return;
    }

    // Check if at least one column is selected
    const hasColumns = this.reportMetadata.columns.primary.length > 0 ||
                      this.reportMetadata.columns.secondary.length > 0 ||
                      this.reportMetadata.columns.tertiary.length > 0;

    if (!hasColumns) {
      alert('Please select at least one column');
      return;
    }

    this.reportService.saveFinalReportType(this.reportMetadata)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          alert('Report created successfully');
          this.getAllSavedReport(); // Refresh the saved reports list
          this.resetCreateForm();
          this.showForm = false;
        },
        error: (error) => {
          console.error('Error creating report:', error);
          alert('Failed to create report: ' + (error.message || 'Unknown error'));
        }
      });
  }
}