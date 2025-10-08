import { Component, OnInit, signal } from '@angular/core';
import { OpportunityCard } from "../opportunity-card/opportunity-card";
import { opportunityModel } from '../models/opportunityModel';
import { opportunityService } from '../../services/opportunityService';
import { getAccountModel } from '../models/account.model';
import { AccountService } from '../../services/accountService';
import { addOpportunityModel } from '../models/newOpportunityModel';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-opportunity',
  imports: [OpportunityCard,FormsModule],
  templateUrl: './opportunity.html',
  styleUrl: './opportunity.css'
})
export class Opportunity implements OnInit {

  addOpportunity:Boolean = false
  addOpportunityToDatabase = <addOpportunityModel>({});
  
  allOpportunity = signal<opportunityModel[]>([]);
  accountReference: getAccountModel[] = [];
  accountId: number = 0;
  
  constructor(private opportunityService: opportunityService,private accountService: AccountService ){}

  ngOnInit(): void {
    this.getAllOpportunity()
    this.getAccountRef()
  }

  getAllOpportunity(): void{
    this.opportunityService.getOpportunity().subscribe({
      next: (res) => {
        this.allOpportunity.set(res)
        console.log(res)
      },
      error: (error) => {
        console.log(error)
      }
    })
    return 

  }

  toogleAddOpportunity(): Boolean{
    return this.addOpportunity = !this.addOpportunity;
  }

  addToDB(): any {
    console.log(this.accountId, this.addOpportunityToDatabase)
    this.opportunityService.addOpportunity(this.accountId, this.addOpportunityToDatabase).subscribe({
      next: () => {
        this.getAllOpportunity();
        alert("Contact Created")
        this.addOpportunity = false;
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


}
