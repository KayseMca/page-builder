import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button'
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatTabsModule} from '@angular/material/tabs';
import { MatListModule } from '@angular/material/list';
import {MatInputModule} from '@angular/material/input';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatRadioModule} from '@angular/material/radio';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatDialogModule} from '@angular/material/dialog';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';




const materialModuels = [
  MatSidenavModule,
  MatButtonModule,
  MatToolbarModule,
  MatIconModule,
  MatTabsModule,
  MatListModule,
  MatInputModule,
  MatDividerModule,
  MatButtonToggleModule,
  FormsModule,
  ReactiveFormsModule,
  MatRadioModule,
  MatExpansionModule,
  MatCheckboxModule,
  MatTooltipModule,
  MatDialogModule,
  MatCardModule,
  MatFormFieldModule

]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ...materialModuels
  ],
  exports:[
    ...materialModuels
  ] 
})
export class MaterialModuleModule { }
