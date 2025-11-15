export interface ReportMetadata {
  reportTypeName: string;
  apiName: string;
  primaryObject: string;
  secondaryObject: string;
  tertiaryObject: string;
  joins: Join[];
  columns: {
    primary: string[];
    secondary: string[];
    tertiary: string[];
  };
}