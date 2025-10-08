import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { contactModel } from '../models/contactModel';
import { addContactModel } from '../models/addContactModel';
import { contactService } from '../../services/contactService';
import { AccountService } from '../../services/accountService';
import { getAccountModel } from '../models/account.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact-card',
  imports: [FormsModule],
  templateUrl: './contact-card.html',
  styleUrl: './contact-card.css'
})
export class ContactCard {
  @Input() allContact: contactModel[] = [];
  @Output() editOccured = new EventEmitter<void>();

  accountReference: getAccountModel[] = []
  data: contactModel | null = null;

  originalData: contactModel = {
    id: 0, firstName: '',
    lastName: '',
    email: '',
    contactAccount: 0
  }
  constructor(private contactService: contactService) { }

  editData: addContactModel = {
    firstName: '',
    lastName: '',
    email: ''
  };


  editId: number | null = null;
  card: Boolean = false


  isEditable: Boolean = false;

  setIsEditable(data: contactModel | null, editAble: Boolean): Boolean {
    if (data) {
      this.editId = data.id
      this.originalData = { ...data }
      this.editData = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
      }
    }
    return this.isEditable = editAble
  }

  hasChanged(): boolean {
    return (
      this.originalData.firstName !== this.editData.firstName ||
      this.originalData.lastName !== this.editData.lastName ||
      this.originalData.email !== this.editData.email
    )
  }

  deleteContact(id: number): void {
    this.contactService.deleteContact(id).subscribe({
      next: () => {
        this.editOccured.emit();
        alert("Account Delete")
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  editOldcontact(id: number): void {
    this.contactService.updateContact(id, this.editData).subscribe({
      next: () => {
        this.editOccured.emit();
        this.isEditable = false;
        alert("Contacted Edited")
      },
      error: (error) => {
        console.log(error)
      },
    })
  }




}
