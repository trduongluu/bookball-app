import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { AuthRoutes } from './auth.routing';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';

@NgModule({
  imports: [
    CommonModule,
    AuthRoutes,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    NgZorroAntdModule
  ],
  declarations: [AuthComponent]
})
export class AuthModule { }
