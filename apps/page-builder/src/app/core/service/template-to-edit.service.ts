import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { map, of, switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TemplateToEditService {
  private readonly url = 'http://localhost:3000/users/'
  private  templateID  = ''
  initialized: boolean=false;
  private data:any
  constructor(@Inject(DOCUMENT) private doc:any, private http:HttpClient,
  // private page_data:PageDataService
  ) {
    
    // even connect another service
   }

  /**
   * from the url
   * @URL
   * * get the template id
   * * then with this id get the remote files and call the template data
   *  * then get the template data(optional for now)
   * * attach the files to DOM
   */

  init(){
    this.template()
    return this.http.get(this.url+this.templateID).pipe(
      map(res=> of(res)),
      switchMap(res=>{
        console.log(res)
        return res
      }),
      tap(template=> {
        let is_valid = Boolean(template)
        if(is_valid){
          this.loadFiles(template)
          return template
        } 
        console.log(template)
        throw new Error("server eror, this is INVALId template ID please be sure the template to edit")
      })
    )
    // const inject = this.injector.get(ActivatedRoute)
    // const inject2 = this.injector.get(Router)
    // return new Promise<void>((resolve, reject) => {
    //   console.log("AppInitService.init() called");
    //   ////do your initialisation stuff here  
    //   setTimeout(() => {
    //       console.log('AppInitService Finished');
    //       resolve();
    //   }, 6000);

      
    // });
    
  }


  loadFiles(template:any){
    //document also working

    
    const script = document.createElement('script');
    // const stylehead = this.doc.createElement('link');
    // stylehead.setAttribute('href','http://127.0.0.1:8080/styles.css')
    // stylehead.setAttribute('rel', 'styesheet')
    script.src =`${template.template_url}angular-elements.js`
    script.defer = true
    // this.doc.head.append(stylehead)
    this.doc.head.append(script)
    // this.page_data.template_dom_name = template.template_element
    // this.doc.body.append(style)
  }
//   init2(){
  // https://stackoverflow.com/questions/48564687/how-to-handle-inform-users-about-unrecoverable-exceptions-in-an-app-initializer
//     return new Promise((resolve, reject) => {
//       this.http.get(this.url+this.templateID)
//           .catch((error: any) => {                      
//               this.initialized = false;
//               resolve(error);
//               return Observable.throw(error || 'Server error');
//           })
//           .subscribe((responseData: any) => {
//               this.settings = responseData;
//               this.initialized = true;
//               resolve(true);
//           });
//   });
// }
//   }


// init2(){
//   this.template()
//   let promise: Promise<any> = new Promise((resolve: any, reject:any) => {
//     this.http.get(this.url+this.templateID).pipe(
//       map((res:any) => {
//         return res
//       }),
//       tap(response=>{
//         console.log(response)
//         if(response) return resolve()
//         // return  throwError('Server error');
//         return reject(
//           confirm("eror")
//         )
//         // throw new Error('this is new error')
//       })

//     )
      
//   });
//   return promise;
// }


  template(){
    const url = new URL(window.location.href);
    console.log(url)
    this.templateID = url.search.replace('?','').split('=')[1]
  }


}
