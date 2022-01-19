import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ColorSketchModule } from 'ngx-color/sketch';
import { ColorChromeModule } from 'ngx-color/chrome';

import { AppRoutingModule } from './app-routing.module';
import { MaterialModuleModule } from './shared/models/material-module.module';


import { PagePropertyServiceService } from './shared/services/page-property/page-property-service.service';
import { PageDataService } from './shared/services/page-data-service/page-data.service';
import { MainModuleModule } from './main/main-module.module';
import { SidebarComponent } from './navigation/sidebar/sidebar.component';
import { HeaderComponent } from './navigation/header/header.component';
import { PagePropertiesModule } from './shared/components/page-properties.module';
import { SearchPagePipe } from './shared/pipe/seach-page.pipe';
import { DeleteDialogComponent } from './dialog/delete-dialog.component';
import { NavComponent } from './navigation/nav/nav.component';
import { SideTypographyComponent } from './navigation/side-typography/side-typography.component';
import { TypographyListComponent } from './navigation/side-typography/typography-list/typography-list.component';
import { TypographyItemComponent } from './navigation/side-typography/typography-item/typography-item.component';
import { BackgroundColorChangeDirective } from './shared/pipe/background-color-change.directive';
import { TypographyService } from './shared/services/typography/typography.service';






@NgModule({
  declarations: [
    AppComponent,

    SidebarComponent,
    HeaderComponent,
    SearchPagePipe,
    DeleteDialogComponent,
    NavComponent,
    SideTypographyComponent,
    TypographyListComponent,
    TypographyItemComponent,
    BackgroundColorChangeDirective,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModuleModule,
    MainModuleModule,
    PagePropertiesModule,
    ColorChromeModule,
    ColorSketchModule // picker color package

   
    
  ],
  // entryComponents:[DeleteDialogComponent],
  providers: [PagePropertyServiceService,PageDataService, TypographyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
