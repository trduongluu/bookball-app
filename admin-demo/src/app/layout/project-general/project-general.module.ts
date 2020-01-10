import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectGeneralComponent } from './project-general.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { FormModule } from '../../../../src/app/_base/modules/form/form.module';
import { FooterModule } from '../../_shared/footer/footer.module';
import { ProjectGeneralDataComponent } from './project-general-data/project-general-data.component';
import { ProjectGeneralRoutingModule } from './project-general-routing.module';
import { CrDataModule } from '../cr/cr-data/cr-data.module';
import { ProjectWorkDataModule } from '../project-work/project-work-data/project-work-data.module';
import { ProjectWorkDataComponent } from '../project-work/project-work-data/project-work-data.component';
import { IssueDataModule } from '../issue/issue-data/issue-data.module';



@NgModule({
  declarations: [ProjectGeneralComponent, ProjectGeneralDataComponent],
  imports: [
    ProjectGeneralRoutingModule,
    CommonModule,
    NgZorroAntdModule,
    FormModule,
    FooterModule,
    ProjectWorkDataModule,
    CrDataModule,
    IssueDataModule
  ]
})
export class ProjectGeneralModule { }
