import { ApplyFilter } from "./applyfilter";

export interface filterRequestReport {
    tableName: string;
    selectedColumns: string[];
    filters: ApplyFilter[];
}