import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectGeneralComponent } from './project-general.component';

const routes: Routes = [{ path: '', component: ProjectGeneralComponent }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProjectGeneralRoutingModule { }