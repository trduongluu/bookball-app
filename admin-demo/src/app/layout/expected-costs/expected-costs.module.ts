import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpectedCostsComponent } from './expected-costs.component';
import { ExpectedCostsDataComponent } from './expected-costs-data/expected-costs-data.component';
import { ExpectedCostsRoutes } from './expected-costs.routing';

@NgModule({
  imports: [
    CommonModule,
    ExpectedCostsRoutes
  ],
  declarations: [ExpectedCostsComponent,ExpectedCostsDataComponent],
  exports:[ExpectedCostsDataComponent]
})
export class ExpectedCostsModule { }
