export interface FinalReportRequestModel {
  name?: string;
  apiName?: string;
  primaryObject?: string;
  secondaryObject?: string;
  tertiaryObject?: string;
  joinQuery?: Join[];
  sections?: Section[];
}
