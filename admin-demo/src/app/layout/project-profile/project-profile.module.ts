import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectProfileComponent } from './project-profile.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { FormModule } from 'src/app/_base/modules/form/form.module';
import { ExtentionTableService } from 'src/app/_base/services/extention-table.service';
import { ProjectProfileDataComponent } from './project-profile-data/project-profile-data.component';
import { ProjectProfileRoutes } from './project-profile.routing';
@NgModule({
  imports: [
    CommonModule,
    FormModule,
    NgZorroAntdModule,
    ProjectProfileRoutes,
  ],
  providers: [
    ExtentionTableService
  ],
  declarations: [ProjectProfileComponent,ProjectProfileDataComponent]
})
export class ProjectProfileModule { }
