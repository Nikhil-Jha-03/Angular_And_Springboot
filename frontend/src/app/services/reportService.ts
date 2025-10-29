import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable, retry } from "rxjs";
import { ReportTypeModel } from "../component/models/reportTypeModel";
import { ReportColumnModel } from "../component/models/reportColumnModel";
import { ReportRequestModel } from "../component/models/reportRequestModel";
import { TableData } from "../component/models/TableDataModel";
import { filterModel } from "../component/models/filterModel";
import { filterRequestReport } from "../component/models/filterReportRequest";

@Injectable({
    providedIn: 'root'
})

export class ReportService {
    private baseUrl = 'http://localhost:8080';

    constructor(private http : HttpClient){}

    getAllReport() : Observable<ReportTypeModel[]> {
        return this.http.get<ReportTypeModel[]>(`${this.baseUrl}/reporttype/allreport`)
    }

    getColumnsOfType(id: number): Observable<ReportColumnModel[]>{
        return this.http.get<ReportColumnModel[]>(`${this.baseUrl}/report/column/${id}`)
    }

    getReportData(id: number,selectedColumns:ReportRequestModel): Observable<TableData>{
        console.log(selectedColumns)
        return this.http.post<TableData>(`${this.baseUrl}/report/data/${id}`,selectedColumns)
    }

    getFilter(): Observable<filterModel[]>{
        return this.http.get<filterModel[]>(`${this.baseUrl}/filter`)
    }

    getReportWithFilter(data: filterRequestReport): Observable<filterRequestReport>{
       return this.http.post<filterRequestReport>(`${this.baseUrl}/reportwithfilterdata`,data)
    }
}
 