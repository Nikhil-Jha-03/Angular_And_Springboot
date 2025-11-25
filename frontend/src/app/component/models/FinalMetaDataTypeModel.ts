// export interface ReportMetadata {
//   name: string;
//   apiName: string;
//   primaryObject: string;
//   secondaryObject: string;
//   tertiaryObject: string;
//   joinQuery: Join[];
// }


export interface ReportMetadata {
  name: string;
  apiName: string;
  primaryObject: string;
  secondaryObject: string;
  tertiaryObject: string;
  joinQuery: Join[];
  columns: {
    primary: string[];
    secondary: string[];
    tertiary: string[];
  };
}