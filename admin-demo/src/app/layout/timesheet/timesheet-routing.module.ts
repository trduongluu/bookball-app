import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TimesheetComponent } from './timesheet.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{ path: '', component: TimesheetComponent }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TimesheetRoutingModule { }
