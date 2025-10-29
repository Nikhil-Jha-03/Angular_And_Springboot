export interface ApplyFilter{
    id:number
    accountId: number | null,
    columnName: string,
    operators: string,
    value: string
}