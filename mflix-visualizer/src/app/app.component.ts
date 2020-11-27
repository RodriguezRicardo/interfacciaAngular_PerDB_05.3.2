import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'mflix-visualizer';
  results : Object[];
  obs : Observable<Object>;

  constructor (private http : HttpClient, private sanitazer : DomSanitizer) {};  //iniettare l’oggetto DOM Sanitizer nel costruttore (importa DomSanitizer)

  //metodo per richiedere al server la lista dei 10 film
  load10Movies()
  {
    this.obs = this.http.get('https://3000-f75d3745-4ca7-43a9-9241-05a37c7c300d.ws-eu01.gitpod.io/users');
    this.obs.subscribe(this.getData);
  }
  getData = (data) => {
    this.results = data;
  }

  /*aggiunto metodo per sanificare il codice.
  L'oggetto sanitize, "sanifica url passato come parametro*/
  photoURL(urltoSanitize) {
    console.log(urltoSanitize);

    //aggiunto un if per poter poi vedere un alert nel html
    if(urltoSanitize == undefined)
    {
      return false;
    }
    return this.sanitazer.bypassSecurityTrustUrl(urltoSanitize);
  }

}
