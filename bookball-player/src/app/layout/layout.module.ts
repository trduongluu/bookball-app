import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { LayoutRoutes } from './layout.routing';
import { NavbarComponent } from '@trduong/shared/components/navbar/navbar.component';
import { MenuComponent } from '@trduong/shared/components/menu/menu.component';
import { FooterComponent } from '@trduong/shared/components/footer/footer.component';

@NgModule({
  imports: [
    CommonModule,
    LayoutRoutes
  ],
  declarations: [LayoutComponent, NavbarComponent, MenuComponent, FooterComponent]
})
export class LayoutModule { }
