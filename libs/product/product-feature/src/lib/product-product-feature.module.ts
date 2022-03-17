import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClientModule} from '@angular/common/http'
import { RouterModule, Route } from '@angular/router';
import { ForumComponent } from './forum/forum.component';
import { HomeComponent } from './home/home.component';
import { LoadPageComponent } from './load-page/load-page.component';
import { ResolverService } from './resolver.service';
import { SharedDataAccessModule } from '@sognando-casa/shared/data-access';


export const productProductFeatureRoutes: Route[] = [
  {path:'',component:HomeComponent},
  {path:':page', component:LoadPageComponent, resolve:{
        data:ResolverService
      },
    }
];



@NgModule({
  imports: [CommonModule, RouterModule, HttpClientModule, SharedDataAccessModule],
  declarations: [
    ForumComponent,
    HomeComponent,
    LoadPageComponent
  ],
  providers:[ResolverService]
})
export class ProductProductFeatureModule {}
