import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormModule } from 'src/app/_base/modules/form/form.module';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { ProjectGroupComponent } from './project-group.component';
import { ProjectGroupRoutes } from './project-group.routing';
import { ExtentionTableService } from 'src/app/_base/services/extention-table.service';
import { ProjectGroupDataComponent } from './project-group-data/project-group-data.component';

@NgModule({
  imports: [
    CommonModule,
    FormModule,
    NgZorroAntdModule,
    ProjectGroupRoutes,
  ],
  providers: [
    ExtentionTableService
  ],
  declarations: [ProjectGroupComponent, ProjectGroupDataComponent]
})
export class ProjectGroupModule { }
