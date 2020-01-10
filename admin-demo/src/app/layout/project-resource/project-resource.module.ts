import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectResourceComponent } from './project-resource.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { FormModule } from 'src/app/_base/modules/form/form.module';
import { ExtentionTableService } from 'src/app/_base/services/extention-table.service';
import { ProjectResourceDataComponent } from './project-resource-data/project-resource-data.component';
import { ProjectResourceRoutes } from './project-resource.routing';


@NgModule({
  imports: [
    CommonModule,
    ProjectResourceRoutes,
    FormModule,
    NgZorroAntdModule,
  ],
  providers: [
    ExtentionTableService
  ],
  declarations: [ProjectResourceComponent,ProjectResourceDataComponent]
})
export class ProjectResourceModule { }
