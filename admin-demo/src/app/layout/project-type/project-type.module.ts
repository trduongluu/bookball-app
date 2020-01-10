import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectTypeComponent } from './project-type.component';
import { ProjectTypeRoutes } from './project-type.routing';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { FormModule } from 'src/app/_base/modules/form/form.module';
import { ExtentionTableService } from 'src/app/_base/services/extention-table.service';
import { ProjectTypeDataComponent } from './project-type-data/project-type-data.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ProjectTypeRoutes,
    FormModule,
    NgZorroAntdModule,
    FormsModule
  ],
  providers: [
    ExtentionTableService
  ],
  declarations: [ProjectTypeComponent, ProjectTypeDataComponent]
})
export class ProjectTypeModule { }
