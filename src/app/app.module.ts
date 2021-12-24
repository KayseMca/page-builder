import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';




import { MaterialModuleModule } from './shared/models/material-module.module';

import { PagePropertiesComponent } from './shared/components/page-properties.component';
import { PagePropertyServiceService } from './shared/service/page-property-service.service';
import { MainModuleModule } from './main/main-module.module';
import { SidebarComponent } from './navigation/sidebar/sidebar.component';
import { HeaderComponent } from './navigation/header/header.component';





@NgModule({
  declarations: [
    AppComponent,

    PagePropertiesComponent,
    SidebarComponent,
    HeaderComponent,
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModuleModule,
    MainModuleModule
  ],
  providers: [PagePropertyServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
