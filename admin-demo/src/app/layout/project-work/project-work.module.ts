import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectWorkComponent } from './project-work.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { FormModule } from 'src/app/_base/modules/form/form.module';
import { ExtentionTableService } from 'src/app/_base/services/extention-table.service';
import { ProjectWorkDataModule } from './project-work-data/project-work-data.module';
import { ProjectWorkRoutes } from './project-work.routing';


@NgModule({
  declarations: [ProjectWorkComponent,],
  imports: [
    CommonModule,
    NgZorroAntdModule,
    ProjectWorkDataModule,
    FormModule,
    ProjectWorkRoutes
  ],
  providers: [
    ExtentionTableService
  ],
})
export class ProjectWorkModule { }
