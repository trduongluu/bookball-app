import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectDocumentComponent } from './project-document.component';
import { ProjectDocumentDataComponent } from './project-document-data/project-document-data.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { FormModule } from 'src/app/_base/modules/form/form.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [ProjectDocumentComponent, ProjectDocumentDataComponent],
  imports: [
    CommonModule,
    NgZorroAntdModule,
    FormModule,
    FormsModule,
  ],
  exports: [ProjectDocumentComponent, ProjectDocumentDataComponent]
})
export class ProjectDocumentModule { }
