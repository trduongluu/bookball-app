import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttachmentsComponent } from './attachments.component';
import { ProjectDocumentModule } from '../project-work/project-document/project-document.module';
import { AttachmentsRoutes } from './attachments.routing';
import { FormModule } from 'src/app/_base/modules/form/form.module';
import { NgZorroAntdModule } from 'ng-zorro-antd';

@NgModule({
  imports: [
    CommonModule,
    ProjectDocumentModule,
    AttachmentsRoutes,
    FormModule,
    NgZorroAntdModule
  ],
  declarations: [AttachmentsComponent]
})
export class AttachmentsModule { }
