import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { contactModel } from "../component/models/contactModel";
import { addContactModel } from "../component/models/addContactModel";

@Injectable({
    providedIn: 'root'
})

export class contactService {
    private baseUrl = 'http://localhost:8080/contact';

    constructor(private http: HttpClient) { }

    // 🔹 Get all contacts
    getContacts(): Observable<contactModel[]> {
        return this.http.get<contactModel[]>(`${this.baseUrl}/getallcontacts`);
    }

    // 🔹 Get one contact by id
    getContactById(id: number): Observable<contactModel> {
        return this.http.get<contactModel>(`${this.baseUrl}/${id}`);
    }

    // 🔹 Add new contact
    addContact(id:number,contact: addContactModel): Observable<contactModel> {
        return this.http.post<contactModel>(`${this.baseUrl}/createcontact/${id}`, contact);
    }

    // 🔹 Update existing contact
    updateContact(id: number, contact: addContactModel): Observable<contactModel> {
        return this.http.post<contactModel>(`${this.baseUrl}/update/${id}`, contact);
    }

    // 🔹 Delete contact
    deleteContact(id: number): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
    }

}