import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { FormModule } from 'src/app/_base/modules/form/form.module';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { UsersDataComponent } from './users-data/users-data.component';
import { UsersRoutes } from './users.routing';

@NgModule({
  imports: [
    CommonModule,
    FormModule,
    NgZorroAntdModule,
    UsersRoutes
  ],
  declarations: [UsersComponent, UsersDataComponent]
})
export class UsersModule { }
