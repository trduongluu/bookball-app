import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PitchComponent } from './pitch.component';
import { PitchDataComponent } from './pitch-data/pitch-data.component';
import { FormModule } from 'src/app/_base/modules/form/form.module';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { PitchRoutes } from './pitch.routing';

@NgModule({
  imports: [
    CommonModule,
    FormModule,
    NgZorroAntdModule,
    PitchRoutes
  ],
  declarations: [PitchComponent, PitchDataComponent]
})
export class PitchModule { }
