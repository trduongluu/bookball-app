import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CostsComponent } from './costs.component';
import { CostsRoutes } from './costs.routing';

@NgModule({
  imports: [
    CommonModule,
    CostsRoutes
  ],
  declarations: [CostsComponent]
})
export class CostsModule { }
