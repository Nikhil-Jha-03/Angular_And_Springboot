import { ApplyFilter } from "./applyfilter";

export interface GetSavedReportModel{
        id:number,
        reportName:string,
        tableName:string,
        selectedCloumns:string[],
        appliedfilter:ApplyFilter[]    
}