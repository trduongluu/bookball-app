import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RenderErrorComponent } from './render-error.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule   
  ],
  exports:[
    RenderErrorComponent    
  ],
  declarations: [RenderErrorComponent]
})
export class RenderErrorModule { }