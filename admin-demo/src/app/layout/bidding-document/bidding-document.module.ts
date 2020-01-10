import { NgModule } from '@angular/core';
import { BiddingDocumentComponent } from './bidding-document.component';
import { FormModule } from 'src/app/_base/modules/form/form.module';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { BiddingDocumentDataComponent } from './bidding-document-data/bidding-document-data.component';
import { BiddingDocumentRoutes } from './bidding-document.routing';
import { ProjectDocumentModule } from '../project-work/project-document/project-document.module';

@NgModule({
  declarations: [BiddingDocumentComponent, BiddingDocumentDataComponent],
  imports: [
    FormModule,
    NgZorroAntdModule,
    BiddingDocumentRoutes,
    ProjectDocumentModule
  ]
})
export class BiddingDocumentModule { }
