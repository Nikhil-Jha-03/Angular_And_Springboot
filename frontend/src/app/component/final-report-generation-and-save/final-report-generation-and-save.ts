import { Component, DestroyRef, OnInit, signal, ɵsetAlternateWeakRefImpl } from '@angular/core';
import { ReportMetadata } from '../models/FinalMetaDataTypeModel';
import { ReportService } from '../../services/reportService';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ReportTypeModel } from '../models/reportTypeModel';
import { __classPrivateFieldGet } from 'tslib';
import { ReportColumnModel } from '../models/reportColumnModel';
import { FormsModule } from '@angular/forms';
import { CdkDropList } from "@angular/cdk/drag-drop";


@Component({
  selector: 'app-final-report-generation-and-save',
  imports: [FormsModule, CdkDropList],
  templateUrl: './final-report-generation-and-save.html',
  styleUrl: './final-report-generation-and-save.css'
})
export class FinalReportGenerationAndSave implements OnInit {

  reportMetadata: ReportMetadata = {
    reportTypeName: '',
    apiName: '',
    primaryObject: '',
    secondaryObject: '',
    tertiaryObject: '',
    joins: [
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

  // store the table name  {id: 1, name: 'Account Report', primaryObject: 'accounts'}{id: 2, name: 'Contact Report', primaryObject: 'contact'}2{id: 3, name: 'Opportunity Report', primaryObject: 'opportunity'} 👇
  reportTypeData = signal<ReportTypeModel[]>([]);

  primayObjectId: number = 0;
  secondaryObjectId: number = 0;
  tertiaryObjectId: number = 0;

  primayObjectColumn = signal<ReportColumnModel[]>([]);
  secondaryObjectColumn = signal<ReportColumnModel[]>([]);
  tertiaryObjectColumn = signal<ReportColumnModel[]>([]);


  constructor(
    private reportService: ReportService,
    private destroyRef: DestroyRef
  ) { }

  ngOnInit(): void {
    this.loadReportTypes();
  }

  loadReportTypes(): void {
    this.reportService.getAllReport().subscribe({
      next: (res) => {
        console.log(res)
        this.reportTypeData.set(res || [])
      },
      error: () => console.error('Error fetching report types')
    });
  }

  private loadColumns(objectName: string, setter: (cols: ReportColumnModel[]) => void) {
    if (!objectName || objectName.trim() === '') return;

    const found = this.reportTypeData().find(
      item => item.primaryObject === objectName
    );

    const id = found?.id;
    if (id) {
      this.reportService.getColumnsOfType(id).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
        next: (cols: ReportColumnModel[]) => {
          console.log(cols)
          setter(cols || [])
        },
        error: (err) => console.error('Error loading columns', err)
      });
    }
  }

  onObjectChange(object: string): void {

    if (object === "primaryObject") {
      return this.loadColumns(this.reportMetadata.primaryObject, cols => this.primayObjectColumn.set(cols));
    }

    if (object === "secondaryObject") {
      return this.loadColumns(this.reportMetadata.secondaryObject, cols => this.secondaryObjectColumn.set(cols));
    }

    if (object === "tertiaryObject") {
      return this.loadColumns(this.reportMetadata.tertiaryObject, cols => this.tertiaryObjectColumn.set(cols));
    }

    alert("Select Column");
  }

  onColumnSelect(event: Event, data: ReportColumnModel, objectType: 'primary' | 'secondary' | 'tertiary'): void {
    const checked = (event.target as HTMLInputElement).checked;

    if (checked) {
      return this.addColumn(data, objectType);
    } else {
      return this.removeColumn(data, objectType);
    }
  }

  addColumn(data: ReportColumnModel, type: 'primary' | 'secondary' | 'tertiary'): void {
    this.reportMetadata.columns[type].push(data.columnName);
  }

  removeColumn(data: ReportColumnModel, type: 'primary' | 'secondary' | 'tertiary'): void {
    this.reportMetadata.columns[type] =
      this.reportMetadata.columns[type].filter(col => col !== data.columnName);
  }

  private generateId(): string {
    return 'join_' + Math.random().toString(36).substr(2, 9);
  }

  // Add new join
  addJoin(): void {
    console.log("first")
    this.reportMetadata.joins.push({
      id: this.generateId(),
      fromObject: '',
      fromField: '',
      toObject: '',
      toField: '',
      joinType: 'LEFT'
    });
  }
  // Remove Join
  removeJoin(id: string): void {
    this.reportMetadata.joins = this.reportMetadata.joins.filter(item => item.id !== id)
  }

  // it is for the to get specific column in the join section 
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
    console.log("ran")
    this.reportService.saveFinalReportType(this.reportMetadata).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(
      {
        next: (res) => {
          console.log(res)
        },
        error: (error) => {
          console.log(error);
        }
      }
    )
  }






  displayData(): void {
    console.log(this.reportMetadata)
    console.log(this.reportTypeData())
    console.log(this.primayObjectColumn())
    console.log(this.secondaryObjectColumn())
    console.log(this.tertiaryObjectColumn())
    console.log(this.tertiaryObjectId)
    console.log(this.tertiaryObjectId)
    console.log(this.tertiaryObjectId)
  }


}
