import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectWorkDataComponent } from './project-work-data.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { FormModule } from 'src/app/_base/modules/form/form.module';
import { ProjectDocumentModule } from '../project-document/project-document.module';


@NgModule({
  declarations: [ProjectWorkDataComponent],
  imports: [
    CommonModule,
    NgZorroAntdModule,
    FormModule,
    ProjectDocumentModule,
   
  ],
  exports:[ProjectWorkDataComponent]
})
export class ProjectWorkDataModule { }
