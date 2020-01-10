import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectProfileDetailComponent } from './project-profile-detail.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { FormModule } from 'src/app/_base/modules/form/form.module';
import { ExtentionTableService } from 'src/app/_base/services/extention-table.service';
import { ProjectProfileDetailDataComponent } from './project-profile-detail-data/project-profile-detail-data.component';
import { ProjectProfileDetailRoutes } from './project-profile-detail.routing';

@NgModule({
  imports: [
    CommonModule,
    FormModule,
    NgZorroAntdModule,
    ProjectProfileDetailRoutes
  ],
  providers: [
    ExtentionTableService
  ],
  declarations: [ProjectProfileDetailComponent,ProjectProfileDetailDataComponent]
})
export class ProjectProfileDetailModule { }
