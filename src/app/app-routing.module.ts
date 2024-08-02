import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { LoginComponent }                      from 'src/app/components/views/shared/login/login.component';
import { MenuuserComponent }                   from 'src/app/components/views/shared/menuuser/menuuser.component';
import { ActividadeseconomicasComponent }      from 'src/app/components/views/tablasmaestras/actividadeseconomicas/actividadeseconomicas.component';
import { ConceptosnotadebitocreditoComponent } from 'src/app/components/views/tablasmaestras/conceptosnotadebitocredito/conceptosnotadebitocredito.component';
import { TiposdedocumentoComponent }           from 'src/app/components/views/tablasmaestras/tiposdedocumento/tiposdedocumento.component';
import { FormasdepagoComponent }               from 'src/app/components/views/tablasmaestras/formasdepago/formasdepago.component';
import { ProductosComponent }                  from 'src/app/components/views/tablasmaestras/productos/productos.component';
import { FormulasComponent }                   from 'src/app/components/views/tablasmaestras/formulas/formulas.component';
import { UnidadesdemedidaComponent }           from 'src/app/components/views/tablasmaestras/unidadesdemedida/unidadesdemedida.component';
import { IvasComponent }                       from 'src/app/components/views/tablasmaestras/ivas/ivas.component';
import { ProgramasComponent }                  from 'src/app/components/views/tablasmaestras/programas/programas.component';
import { ColoresComponent }                    from 'src/app/components/views/tablasmaestras/colores/colores.component';
import { EstadosdeunregistroComponent }        from 'src/app/components/views/tablasmaestras/estadosdeunregistro/estadosdeunregistro.component';
import { SinoComponent }                       from 'src/app/components/views/tablasmaestras/sino/sino.component';
import { ProveedoresComponent }                from 'src/app/components/views/tablasmaestras/proveedores/proveedores.component';
import { RetencionesComponent }                from 'src/app/components/views/tablasmaestras/retenciones/retenciones.component';
import { SaldosComponent }                     from 'src/app/components/views/tablasmaestras/saldos/saldos.component';
import { TallasComponent } from 'src/app/components/views/tablasmaestras/tallas/tallas.component';
import { TiposdepersonaComponent } from 'src/app/components/views/tablasmaestras/tiposdepersona/tiposdepersona.component';
import { TiposdeagenteComponent } from 'src/app/components/views/tablasmaestras/tiposdeagente/tiposdeagente.component';
import { TiposdecuentabancariaComponent } from './components/views/tablasmaestras/tiposdecuentabancaria/tiposdecuentabancaria.component';
import { TiposderegimenComponent } from './components/views/tablasmaestras/tiposderegimen/tiposderegimen.component';



const routes: Routes = [
 
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component:LoginComponent },
  { path: 'menuuser', component: MenuuserComponent },

  { path: 'actividadeseconomicas/:permisos', component: ActividadeseconomicasComponent },
  { path: 'colores/:permisos', component: ColoresComponent },
  { path: 'estadosdeunregistro/:permisos', component:  EstadosdeunregistroComponent },
  { path: 'conceptosnotadebitocredito/:permisos', component: ConceptosnotadebitocreditoComponent },
  { path: 'tiposdedocumento/:permisos', component: TiposdedocumentoComponent },
  { path: 'formasdepago/:permisos', component: FormasdepagoComponent },
  { path: 'formulas/:permisos', component: FormulasComponent },
  { path: 'productos/:permisos', component: ProductosComponent },
  { path: 'unidadesdemedida/:permisos', component: UnidadesdemedidaComponent },
  { path: 'ivas/:permisos', component: IvasComponent },
  { path: 'programas/:permisos', component: ProgramasComponent },
  { path: 'sino/:permisos', component: SinoComponent },
  { path: 'proveedores/:permisos', component:ProveedoresComponent },
  { path: 'retenciones/:permisos', component:RetencionesComponent },
  { path: 'saldos/:permisos', component: SaldosComponent },
  { path: 'sino/:permisos', component: SinoComponent },
  { path: 'tallas/:permisos', component:TallasComponent },
  { path: 'tiposdepersona/:permisos', component:TiposdepersonaComponent },
  { path: 'tiposdeagente/:permisos', component: TiposdeagenteComponent },
  { path: 'tiposdecuentabancaria/:permisos', component: TiposdecuentabancariaComponent },
  { path: 'tiposderegimen/:permisos', component: TiposderegimenComponent },
  
  ];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
