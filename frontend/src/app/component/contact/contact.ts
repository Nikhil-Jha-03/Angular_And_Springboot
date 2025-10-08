import { Component, OnInit, signal } from '@angular/core';
import { contactModel } from '../models/contactModel';
import { contactService } from '../../services/contactService';
import { ContactCard } from "../contact-card/contact-card";
import { addContactModel } from '../models/addContactModel';
import { AccountService } from '../../services/accountService';
import { getAccountModel } from '../models/account.model';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-contact',
  imports: [ContactCard, FormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css'
})
export class Contact implements OnInit {

  addContact: Boolean = false
  allContact = signal<contactModel[]>([]);

  addContactToDatabase = <addContactModel>({});
  accountReference: getAccountModel[] = [];
  accountId: number = 0;


  constructor(private contactService: contactService, private accountService: AccountService) { }

  ngOnInit(): void {
    this.getAllContact()
    this.getAccountRef()
  }

  toogleAddContact(): Boolean {
    console.log("first")
    console.log(typeof (this.accountId));
    return this.addContact = !this.addContact
  }

  getAllContact(): void {
    this.contactService.getContacts().subscribe({
      next: (res) => {
        this.allContact.set(res)
        console.log(res)
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  getAccountRef(): void {
    this.accountService.getAccounts().subscribe({
      next: (res) => {
        this.accountReference = res;
      },
      error: (error) => {
        console.log(error)
      }
    })
  }


  addToDB(): any {
    this.contactService.addContact(this.accountId, this.addContactToDatabase).subscribe({
      next: () => {
        this.getAllContact();
        alert("Contact Created")
        this.addContact = false;
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

}
