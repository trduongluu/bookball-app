import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PitchsComponent } from './pitchs.component';
import { PitchsRoutes } from './pitchs.routing';
import { NgZorroAntdModule } from 'ng-zorro-antd';

@NgModule({
  imports: [
    CommonModule,
    PitchsRoutes,
    NgZorroAntdModule
  ],
  declarations: [PitchsComponent]
})
export class PitchsModule { }
