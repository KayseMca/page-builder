import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

function bootstrap() {
     platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err =>{ 
    console.error(err)
    console.log("Console.log got an errro ###########")
    const errorMsgElement = document.querySelector('#errorMsgElement');
    let message:any = 'Application initialization failed';
    if (err) {
        if (err.message) {
            message = message + ': ' + err.message;
        } else {
            message = message + ': ' + err;
        }
    }
    errorMsgElement!.textContent = message;
  });
   };


if (document.readyState === 'complete') {
  bootstrap();
} else {
  document.addEventListener('DOMContentLoaded', bootstrap);
}
