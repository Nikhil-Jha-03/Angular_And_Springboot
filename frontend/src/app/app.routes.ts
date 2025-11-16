import { Routes } from '@angular/router';
import { Account } from './component/account/account';
import { Contact } from './component/contact/contact';
import { Opportunity } from './component/opportunity/opportunity';
import { Report } from './component/report/report'
import { SavedReports } from './component/saved-reports/saved-reports';
import { FinalReportGenerationAndSave } from './component/final-report-generation-and-save/final-report-generation-and-save';

export const routes: Routes = [
    {
        path: '',
        component: Account
    },
    {
        path: 'contact',
        component: Contact
    },
    {
        path: 'opportunity',
        component: Opportunity
    },
    {
        path: 'report',
        component: Report
    },
    {
        path: 'savedreport',
        component: FinalReportGenerationAndSave
    },
    // {
    //     path: 'savedreport',
    //     component: SavedReports
    // }
];
