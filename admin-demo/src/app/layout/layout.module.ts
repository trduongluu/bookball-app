import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { LayoutRoutes } from './layout.routing';
import { MenuModule } from '../_shared/menu/menu.module';
import { FooterModule } from '../_shared/footer/footer.module';
import { NavbarModule } from '../_shared/navbar/navbar.module';
import { BreadcrumbModule } from '../_shared/breadcrumb/breadcrumb.module';


@NgModule({
  imports: [
    CommonModule,
    MenuModule,
    FooterModule,
    NavbarModule,
    BreadcrumbModule,
    LayoutRoutes
  ],
  declarations: [LayoutComponent]
})
export class LayoutModule { }
