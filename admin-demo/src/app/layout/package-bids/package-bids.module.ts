import { NgModule } from '@angular/core';
import { PackageBidsComponent } from './package-bids.component';
import { FormModule } from 'src/app/_base/modules/form/form.module';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { PackageBidsDataComponent } from './package-bids-data/package-bids-data.component';
import { PackageBidsRoutes } from './package-bids.routing';
import { ProjectDocumentModule } from '../project-work/project-document/project-document.module';

@NgModule({
  declarations: [PackageBidsComponent, PackageBidsDataComponent],
  imports: [
    FormModule,
    NgZorroAntdModule,
    PackageBidsRoutes,
    ProjectDocumentModule
  ]
})
export class PackageBidsModule { }
