import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { opportunityModel } from "../component/models/opportunityModel";
import { addOpportunityModel } from "../component/models/newOpportunityModel";

@Injectable({
    providedIn: 'root'
})

export class opportunityService {
    private baseUrl = 'http://localhost:8080/opportunity';

    constructor(private http: HttpClient) { }

    // 🔹 Get all opportunity
    getOpportunity(): Observable<opportunityModel[]> {
        return this.http.get<opportunityModel[]>(`${this.baseUrl}/getallopportunity`);
    }

    // 🔹 Get one opportunity by id
    getOpportunityById(id: number): Observable<opportunityModel> {
        return this.http.get<opportunityModel>(`${this.baseUrl}/${id}`);
    }

    // 🔹 Add new opportunity
    addOpportunity(id:number,opportunity: addOpportunityModel): Observable<opportunityModel> {
        return this.http.post<opportunityModel>(`${this.baseUrl}/createopportunity/${id}`, opportunity);
    }

    // 🔹 Update existing opportunity
    updateOpportunity(id: number, opportunity: addOpportunityModel): Observable<opportunityModel> {
        return this.http.put<opportunityModel>(`${this.baseUrl}/update/${id}`, opportunity);
    }

    // 🔹 Delete opportunity
    deleteOpportunity(id: number): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
    }

}