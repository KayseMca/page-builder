import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { SharedDataService } from './shared-data-service';


// testing to export this service for other libs and apps
// export {SharedDataService} from './shared-data-service'
@NgModule({

imports: [CommonModule, HttpClientModule],

providers:[SharedDataService]
})
export class SharedDataAccessModule {}
