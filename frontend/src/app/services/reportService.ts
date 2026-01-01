import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable, retry } from "rxjs";
import { ReportTypeModel } from "../component/models/reportTypeModel";
import { ReportColumnModel } from "../component/models/reportColumnModel";
import { ReportRequestModel } from "../component/models/reportRequestModel";
import { TableData } from "../component/models/TableDataModel";
import { filterModel } from "../component/models/filterModel";
import { filterRequestReport } from "../component/models/filterReportRequest";
import { SaveReportModel } from "../component/models/saveReportModel";
import { GetSavedReportModel } from "../component/models/getSaveReportModel";
import { ReportMetadata } from "../component/models/FinalMetaDataTypeModel";
import { FinalReportRequestModel } from "../component/models/FinalReportRequestModel";

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

    saveReport(data:SaveReportModel):Observable<SaveReportModel>{
       return this.http.post<SaveReportModel>(`${this.baseUrl}/report/savereport`,data)
    }

    getSavedReport():Observable<GetSavedReportModel[]>{
        return this.http.get<GetSavedReportModel[]>(`${this.baseUrl}/report/getsavereport`)
    }


    // For the report type save

    saveFinalReportType(body:ReportMetadata):Observable<ReportMetadata>{
        console.log(body)
        return this.http.post<ReportMetadata>(`${this.baseUrl}/savefinalreport`,body)
    }
    
    // Get all saved Report
    
    getAllSavedReport():Observable<FinalReportRequestModel[]>{
        return this.http.get<FinalReportRequestModel[]>(`${this.baseUrl}/getAllSavedReport`)
    }
    
    saveEditReportType(body:FinalReportRequestModel):Observable<FinalReportRequestModel>{
        console.log("body in service",body)
        return this.http.post<FinalReportRequestModel>(`${this.baseUrl}/saveEditReport`,body)
    }

}
 