import { Component, EventEmitter, Input, Output, Pipe } from '@angular/core';
import { opportunityModel } from '../models/opportunityModel';
import { getAccountModel } from '../models/account.model';
import { opportunityService } from '../../services/opportunityService';
import { addOpportunityModel } from '../models/newOpportunityModel';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-opportunity-card',
  imports: [CommonModule, FormsModule],
  templateUrl: './opportunity-card.html',
  styleUrl: './opportunity-card.css'
})
export class OpportunityCard {

  @Input() allOpportunity: opportunityModel[] = [];
  @Output() editOccured = new EventEmitter<void>();


  accountReference: getAccountModel[] = [];
  data: opportunityModel | null = null;

  originalData: opportunityModel = {
    id: 0,
    name: '',
    stage: '',
    amount: 0,
    closeDate: new Date(),
    accountId: 0
  }

  constructor(private opportunityService: opportunityService) { }

  editData: addOpportunityModel = {
    name: '',
    stage: '',
    amount: 0,
    closeDate: new Date(),
  };

  editId: number | null = null;
  card: Boolean = false

  isEditable: Boolean = false;


  setIsEditable(data: opportunityModel | null, editAble: Boolean): Boolean {
    if (data) {
      this.editId = data.id
      this.originalData = { ...data }
      this.editData = {
        name: data.name,
        stage: data.stage,
        amount: data.amount,
        closeDate: data.closeDate
      }
    }
    return this.isEditable = editAble
  }

  hasChanged(): boolean {
    return (
      this.originalData.name !== this.editData.name ||
      this.originalData.amount !== this.editData.amount ||
      this.originalData.closeDate !== this.editData.closeDate ||
      this.originalData.stage !== this.editData.stage
    )
  }


  deleteContact(id: number): void {
    this.opportunityService.deleteOpportunity(id).subscribe({
      next: () => {
        this.editOccured.emit();
        alert("Account Delete")
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  editOldOpportunity(id: number): void {
    this.opportunityService.updateOpportunity(id, this.editData).subscribe({
      next: () => {
        this.editOccured.emit();
        this.isEditable = false;
        alert("Opportunity Edited")
      },
      error: (error) => {
        console.log(error)
      },
    })
  }

}
