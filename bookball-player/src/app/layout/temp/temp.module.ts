import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TempComponent } from './temp.component';
import { TempRoutes } from './temp.routing';

@NgModule({
  imports: [
    CommonModule,
    TempRoutes
  ],
  declarations: [TempComponent]
})
export class TempModule { }
