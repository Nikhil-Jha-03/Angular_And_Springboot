import { HttpClient } from "@angular/common/http";
import { getAccountModel } from "../component/models/account.model";
import { Observable } from "rxjs";
import { addAccountModel } from "../component/models/addAccountModel";
import { Injectable } from "@angular/core";
@Injectable({
    providedIn:'root'
})

export class AccountService {
    private baseUrl = 'http://localhost:8080/account';

    constructor(private http: HttpClient) { }

    // 🔹 Get all accounts
    getAccounts(): Observable<getAccountModel[]> {
        return this.http.get<getAccountModel[]>(`${this.baseUrl}/allaccount`);
    }

    // 🔹 Get one account by id
    getAccountById(id: number): Observable<getAccountModel> {
        return this.http.get<getAccountModel>(`${this.baseUrl}/${id}`);
    }

    // 🔹 Add new account
    addAccount(account: addAccountModel): Observable<getAccountModel> {
        return this.http.post<getAccountModel>(`${this.baseUrl}/create`, account);
    }

    // 🔹 Update existing account
    updateAccount(id: number, account: addAccountModel): Observable<getAccountModel> {
        return this.http.put<getAccountModel>(`${this.baseUrl}/update/${id}`, account);
    }

    // 🔹 Delete account
    deleteAccount(id: number): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
    }

}