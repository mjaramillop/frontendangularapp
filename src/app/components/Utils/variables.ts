import { environment } from "src/environments/environment";


export class Variables  {
  URL: string = environment.URL;
  urlimagenes :string =this.URL+'/Image/GetImage/';
  urlcargararchivos:string =this.URL+ '/Image/Upload';
  topvisiblegrilla:string = '50px';
  leftvisiblegrilla: string = '260px';
  anchoventana:string ='1350px';
  altoventana:string ='600px';
  menuancho:string='250px';
  menualto:string='600px';
  menutop:string='50';
  menuleft:string='0px';
  codigotipodeagentecliente="1";
  codigotipodeagenteproveedor="3";
  formatodefechaparagrabarenlabasededatos:string='ymd'
  
}


