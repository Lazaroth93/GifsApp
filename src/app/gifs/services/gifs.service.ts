import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interface/gifs.interfaces';

@Injectable({
  providedIn: 'root' //servicio elevado a nivel global
  //al inyectar el providerIn en el decorador le dice a angular que donde este este servicio 
  //va a ser global en el root , evita especificarlo en los providers en gifs.module.ts
})
export class GifsService {

  private apiKey  : string ='fnUN8gkl1b8hG0AB5ZzlHqTE1AQvNrrz';
  //arrreglo de string

  private servicioUrl : string = 'https://api.giphy.com/v1/gifs'; 

  private _historial:string[] = []; //propiedad privada para almacenar strings
  
  //TODO cambiar any por su tipo correspondiente
  public resultados: Gif[] = [];

  //
  get historial() {
    
    return [...this._historial];
  }

  constructor(private http: HttpClient){  // realizamos la llamada a la API gifs para realizar las buquedas 
    
    this._historial = JSON.parse (localStorage.getItem('historial')!)! || [];
    this.resultados = JSON.parse (localStorage.getItem('resultados')!)! || [];

    //Estas dos lineas de abajo equivalen a la linea de arriba
    // if( localStorage.getItem('historial')) {
     // this._historial = JSON.parse( localStorage.getItem('historial')! );
   // }
  }


  //insertamos valores a una nueva funcion
                               
  buscarGifs (query: string = ''){
     //con trim eliminamos los espacios
    query = query.trim().toLocaleLowerCase(); // de esta manera los resultados en masyusculas y minusculas se identifican igual 

 

    if ( !this._historial.includes ( query ) ){  //si no lo incluye lo insertamos
          this._historial.unshift  ( query );
    //aseguramos que no se dupliquen las busquedas
    this._historial = this._historial.splice (0,10); //cortamos la inserccion en un maximo de 10 busquedass
    
    localStorage.setItem('historial', JSON.stringify( this.historial )  );
  }


    const params = new HttpParams()
        .set('api_key', this.apiKey)
        .set('limit', '10')
        .set('q' , query);
        
  
    //estas peticiones http retornan observables podemos añadir funcionalidades a la hora de hacer la peticion
    this.http.get<SearchGifsResponse>(`${ this.servicioUrl }/search`, {params})
            .subscribe ( (resp) => {
              this.resultados = resp.data;
              localStorage.setItem('resultados', JSON.stringify( this.resultados)  );
            });





  }
  
}
