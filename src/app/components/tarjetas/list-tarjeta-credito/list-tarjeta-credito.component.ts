import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TarjetaCredito } from 'src/app/models/tarjetaCredito';
import { TarjetaService } from 'src/app/services/tarjeta.service';

@Component({
  selector: 'app-list-tarjeta-credito',
  templateUrl: './list-tarjeta-credito.component.html',
  styleUrls: ['./list-tarjeta-credito.component.css']
})
export class ListTarjetaCreditoComponent implements OnInit {

  constructor(public tarjetaService: TarjetaService, private toast: ToastrService) { }

  ngOnInit(): void {
    this.tarjetaService.obtenerTarjetas();
  }


  eliminarTarjeta(id: any){
    if(confirm('Esta seguro que desea eliminar este registro?')){
      this.tarjetaService.eliminarTarjeta(id).subscribe(data => {
        this.toast.success('Registro eliminado', 'Registro eliminado con exito');
        this.tarjetaService.obtenerTarjetas();
      })
    }
  }

  editar(tarjeta: TarjetaCredito){
    return this.tarjetaService.actualizar(tarjeta);
  }
}
