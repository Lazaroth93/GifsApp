import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent  {

  @ViewChild('txtBuscar') txtBuscar!:ElementRef<HTMLInputElement>;//DOCUMENTACIO TYPESCRIPT https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-0.html#non-null-assertion-operator
  
  constructor (private GifsService: GifsService){}

  buscar() {
    const valor = this.txtBuscar.nativeElement.value;

    if( valor.trim().length == 0){ //si presionamos enter con el inoput vacio no devolvemos nada s
      return;
    }


    this.GifsService.buscarGifs( valor );

    this.txtBuscar.nativeElement.value = ''; //en esta linea reasignamos el valor a un string vacio una vez hemos capturado el input para dejarlo vacio

    

    
  }

  //document.querySelector('input').value =''; asi limpiariamos el inout en javascript

  

 
}
