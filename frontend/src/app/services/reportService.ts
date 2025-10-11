import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ReportTypeModel } from "../component/models/reportTypeModel";
import { ReportColumnModel } from "../component/models/reportColumnModel";

@Injectable({
    providedIn: 'root'
})

export class ReportService {
    private baseUrl = 'http://localhost:8080';

    constructor(private http : HttpClient){}

    getAllReport() : Observable<ReportTypeModel[]> {
        return this.http.get<ReportTypeModel[]>(`${this.baseUrl}/reporttype/allreport`)
    }

    getColumnsOfType(id: number): Observable<ReportColumnModel>{
        return this.http.get<ReportColumnModel>(`${this.baseUrl}/report/column/${id}`)
    }
}
