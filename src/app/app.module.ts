import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';



import { ActividadeseconomicasComponent } from 'src/app/components/views/tablasmaestras/actividadeseconomicas/actividadeseconomicas.component';
import { MenuuserComponent } from 'src/app/components/views/shared/menuuser/menuuser.component';
import { LoginComponent } from 'src/app/components/views/shared/login/login.component';
import { ConceptosnotadebitocreditoComponent } from 'src/app/components/views/tablasmaestras/conceptosnotadebitocredito/conceptosnotadebitocredito.component';
import { TiposdedocumentoComponent } from 'src/app/components/views/tablasmaestras/tiposdedocumento/tiposdedocumento.component';
import { FormasdepagoComponent } from 'src/app/components/views/tablasmaestras/formasdepago/formasdepago.component';
import { FormulasComponent } from 'src/app/components/views/tablasmaestras/formulas/formulas.component';
import { ProductosComponent } from 'src/app/components/views/tablasmaestras/productos/productos.component';
import { UnidadesdemedidaComponent } from 'src/app/components/views/tablasmaestras/unidadesdemedida/unidadesdemedida.component';
import { MensajesComponent } from 'src/app/components/views/shared/mensajes/mensajes.component';
import { ProductosnivelesComponent } from 'src/app/components/views/tablasmaestras/productos-niveles/productos-niveles.component';
import { ProductosCambiodepreciosComponent } from 'src/app/components/views/tablasmaestras/productos-cambiodeprecios/productos-cambiodeprecios.component';
import { IvasComponent } from './components/views/tablasmaestras/ivas/ivas.component';
import { ProgramasComponent } from 'src/app/components/views/tablasmaestras/programas/programas.component';
import { ColoresComponent } from 'src/app/components/views/tablasmaestras/colores/colores.component';
import { EstadosdeunregistroComponent } from 'src/app/components/views/tablasmaestras/estadosdeunregistro/estadosdeunregistro.component';
import { SinoComponent } from 'src/app/components/views/tablasmaestras/sino/sino.component';
import { ProveedoresComponent } from 'src/app/components/views/tablasmaestras/proveedores/proveedores.component';
import { ProveedoresnivelesComponent } from 'src/app/components/views/tablasmaestras/proveedoresniveles/proveedoresniveles.component';
import { RetencionesComponent } from 'src/app/components/views/tablasmaestras/retenciones/retenciones.component';
import { SaldosComponent } from 'src/app/components/views/tablasmaestras/saldos/saldos.component';
import { TallasComponent } from 'src/app/components/views/tablasmaestras/tallas/tallas.component';
import { TiposdepersonaComponent } from './components/views/tablasmaestras/tiposdepersona/tiposdepersona.component';
import { TiposdeagenteComponent } from './components/views/tablasmaestras/tiposdeagente/tiposdeagente.component';
import { TiposdecuentabancariaComponent } from './components/views/tablasmaestras/tiposdecuentabancaria/tiposdecuentabancaria.component';
import { TiposderegimenComponent } from './components/views/tablasmaestras/tiposderegimen/tiposderegimen.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MenuuserComponent,
    ActividadeseconomicasComponent,
    ConceptosnotadebitocreditoComponent,
    TiposdedocumentoComponent,
    FormasdepagoComponent,
    FormulasComponent,
    ProductosComponent,
    UnidadesdemedidaComponent,
    MensajesComponent,
    ProductosnivelesComponent,
    ProductosCambiodepreciosComponent,
    IvasComponent,
    ProgramasComponent,
    ColoresComponent,
    EstadosdeunregistroComponent,
    SinoComponent,
    ProveedoresComponent,
    ProveedoresnivelesComponent,
    RetencionesComponent,
    SaldosComponent,
    TallasComponent,
    TiposdepersonaComponent,
    TiposdeagenteComponent,
    TiposdecuentabancariaComponent,
    TiposderegimenComponent,
   
   
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule,
    MatTooltipModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
