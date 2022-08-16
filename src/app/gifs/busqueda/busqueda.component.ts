import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent  {

  @ViewChild('txtBuscar') txtBuscar!:ElementRef<HTMLInputElement>;//DOCUMENTACIO TYPESCRIPT https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-0.html#non-null-assertion-operator

  buscar() {
    const valor = this.txtBuscar.nativeElement.value;


    console.log(valor);

    this.txtBuscar.nativeElement.value = ''; //en esta linea reasignamos el valor a un string vacio una vez hemos capturado el input para dejarlo vacio

    

    
  }

  //document.querySelector('input').value =''; asi limpiariamos el inout en javascript

  

 
}
