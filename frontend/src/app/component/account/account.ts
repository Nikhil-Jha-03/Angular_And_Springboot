import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Component, inject, NgModule, OnInit, signal } from '@angular/core';
import { environment } from '../../../environment/environment';
import { getAccountModel } from '../models/account.model';
import { MatTableModule } from '@angular/material/table';
import { Card } from "../card/card";
import { addAccountModel } from '../models/addAccountModel';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../services/accountService';


@Component({
  selector: 'app-account',
  imports: [MatTableModule, CommonModule, Card, FormsModule],
  templateUrl: './account.html',
  styleUrl: './account.css'
})

export class Account implements OnInit {
  allAccount = signal<getAccountModel[]>([]);
  addAccount: Boolean = false;
  addAccountToDatabase = <addAccountModel>({})

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
    this.getAlluser();
  }

  toogleAddAccount(): Boolean {
    return this.addAccount = !this.addAccount
  }

  getAlluser(): void {
    this.accountService.getAccounts().subscribe({
      next: (res) => {
        this.allAccount.set(res);
      },
      error: (error) => {
        console.log(error)

      }
    })
  }


  addToDB(): void {
    this.accountService.addAccount(this.addAccountToDatabase).subscribe({
      next: () => {
        alert("User Create")
        this.getAlluser();
        this.addAccount = false
      },
      error: (error) => {
        console.log("Something Went Wroong", error.error.message)
      }
    })



  }


  // onCreateAccount 
  // this.http.post(Url,this.data).subscribe({
  //   next:(result)=>{

  //   },
  //   error:(error)=>{

  //   }
  // })

}
function addToDB() {
  throw new Error('Function not implemented.');
}

