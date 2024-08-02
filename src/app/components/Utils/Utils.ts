



import { FileUploadService } from 'src/app/components/services/utils/file-upload.service';

export class Utils {
  // Variable to store shortLink from api response
  shortLink: string = '';
  loading: boolean = false; // Flag variable
  file: File; // Variable to store file
  mensaje: string = '';

  mensajedeerror: string = '';

  constructor(private fileUploadService: FileUploadService) {}

  // On file Select
  onChangefile(event: any) {
    this.file = event.target.files[0];
  }

  // OnClick of button Upload
  onUploadfile(ruta:string , nombredelarchivoacargar:string , directorio:string ,idusuario:number, tipodedocumento: number) {
    this.loading = !this.loading;

    if (this.file.name !== nombredelarchivoacargar) {
      alert(
        'el nombre del archivo a cargar debe ser : ' + nombredelarchivoacargar
      );
      return;
    }

    this.fileUploadService.upload( ruta, this.file, directorio,idusuario,tipodedocumento  ).subscribe({
      next: (data) => {
        this.mensajedeerror = data[0];
      },

      error: (e) => {
        this.mensajedeerror =  'Error: ' +  e;
      },
    });
  }
}
