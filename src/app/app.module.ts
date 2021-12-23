import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



import { MaterialModuleModule } from './shared/models/material-module.module';
import { SidenavComponent } from './sidebar/sidenav.component';
import { PagePropertiesComponent } from './shared/components/page-properties.component';




@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    PagePropertiesComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModuleModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
