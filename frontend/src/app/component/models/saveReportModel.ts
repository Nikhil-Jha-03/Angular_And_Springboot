import { ApplyFilter } from "./applyfilter";

export interface SaveReportModel{
    reportName:string,
    tableName:string,
    selectedCloumns:string[],
    appliedfilter:ApplyFilter[]    
}