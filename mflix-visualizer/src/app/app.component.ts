import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'mflix-visualizer';
  results : Object[];
  obs : Observable<Object>;

  constructor (private http : HttpClient) {};

  //metodo per richiedere al server la lista dei 10 film
  load10Movies()
  {
    this.obs = this.http.get('https://3000-e46ccc48-87c1-4bc9-b9ee-b2f348ef9471.ws-eu01.gitpod.io/users');
    this.obs.subscribe(this.getData);
  }
  getData = (data) => {
    this.results = data;
  }
}
