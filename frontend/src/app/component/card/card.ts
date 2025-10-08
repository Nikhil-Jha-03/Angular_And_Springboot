import { Component, EventEmitter, inject, Input, output, Output, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Account } from '../account/account';
import { getAccountModel } from '../models/account.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { addAccountModel } from '../models/addAccountModel';
import { environment } from '../../../environment/environment';
import { AccountService } from '../../services/accountService';


@Component({
  selector: 'app-card',
  imports: [CommonModule, FormsModule],
  templateUrl: './card.html',
  styleUrl: './card.css'
})

export class Card {
  @Input() allAccount: getAccountModel[] = [];
  @Output() editOccured = new EventEmitter<void>();
  data: getAccountModel | null = null;
  originalData: getAccountModel = {
    id: 0, name: '', industry: '', annualRevenue: 0};
  editData: addAccountModel = { name: '', industry: '', annualRevenue: 0 };
  editId: number | null = null;
  card: Boolean = false

  constructor(private accountService: AccountService) { }

  isEditable: Boolean = false;

  setIsEditable(data: getAccountModel | null, editAble: Boolean): Boolean {
    if (data) {
      this.editId = data.id
      this.originalData = { ...data }
      this.editData = {
        name: data.name,
        industry: data.industry,
        annualRevenue: data.annualRevenue,
      }
    }
    return this.isEditable = editAble
  }

  hasChanged(): Boolean {
    return (
      this.editData.name !== this.originalData.name ||
      this.editData.industry !== this.originalData.industry ||
      this.editData.annualRevenue !== this.originalData.annualRevenue
    )
  }

  editOldAccount(id: any): void {
    this.accountService.updateAccount(id, this.editData).subscribe({
      next: () => {
        this.isEditable = false
        this.editOccured.emit();
        alert("Account Edited")
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  deleteAccount(id: number): void {
    this.accountService.deleteAccount(id).subscribe({
      next: () => {
        this.editOccured.emit();
        alert("Account Delete")
      },
      error: (error) => {
        console.log(error)
      }
    })
  }
  
}

// Make Edit post request]