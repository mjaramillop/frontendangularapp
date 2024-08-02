
import { Observable } from 'rxjs';

export class Validaciones {
  mensajedeerror: string = '';

  constructor() {this.mensajedeerror="" }


  Validarvalormayorquecero(campo: string, valor: number) {
    if (valor <= 0) {
      this.mensajedeerror = this.mensajedeerror + campo + " no puede ser menor que cero "+'\n';
      
    }
  }


  Validarvalordiferentedecero(campo: string, valor: number) {
    if (valor == 0) {
      this.mensajedeerror = this.mensajedeerror + campo + " no puede ser  cero "+'\n'  ;
      
    }
  }


  Validarvalormenorquecero(campo: string, valor: number) {
    if (valor < 0) {
      this.mensajedeerror = this.mensajedeerror + campo + " no puede ser  menor que cero "+'\n';
      
    }
  }


  Validarnombre(campo: string, valor: string) {

   
    if (valor.length === 0) {
    this.mensajedeerror = this.mensajedeerror + campo + " no puede vacio "+'\n';
      
    }
  }


  Validarnumerico(campo: string, valor:number) {

   
    if (  isNaN(valor)) {
    this.mensajedeerror = this.mensajedeerror + campo + " no es numerico "+'\n';
      
    }
  }


}
