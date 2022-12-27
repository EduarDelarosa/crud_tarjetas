import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { TarjetaCredito } from 'src/app/models/tarjetaCredito';
import { TarjetaService } from 'src/app/services/tarjeta.service';

@Component({
  selector: 'app-tarjeta-credito',
  templateUrl: './tarjeta-credito.component.html',
  styleUrls: ['./tarjeta-credito.component.css']
})
export class TarjetaCreditoComponent implements OnInit, OnDestroy {

  form!: FormGroup;
  suscription?: Subscription;
  tarjeta!: TarjetaCredito;
  idTarjeta?: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private tarjetaService: TarjetaService,
    private toast: ToastrService
    ) {
      this.form = this.formBuilder.group({
      id: 0,
      titular: ['', [Validators.required]],
      numeroTarjeta: ['', [Validators.required, Validators.maxLength(16), Validators.minLength(16)]],
      fechaExpiracion: ['', [Validators.required, Validators.maxLength(5), Validators.minLength(5)]],
      cvv: ['', [Validators.required, Validators.maxLength(3), Validators.minLength(3)]],
    });
  }

  ngOnDestroy(): void {
    this.suscription?.unsubscribe();
  }

  ngOnInit(): void {
    this.tarjetaService.obtenerTarjeta$().subscribe(data => {
      this.tarjeta = data;
      this.form.patchValue({
        titular : this.tarjeta.nombreTitular,
        numeroTarjeta : this.tarjeta.numeroTarjeta,
        fechaExpiracion : this.tarjeta.fechaExpiracion,
        cvv: this.tarjeta.cvv
      });
      this.idTarjeta = this.tarjeta.id;
    })
  }

  public guardarTarjeta(){
    if(this.idTarjeta === undefined){
      this.guardar();
    }else {
      this.editar();
    }
  }

  guardar() {
    const tarjeta: TarjetaCredito = {
      nombreTitular: this.form.get('titular')?.value,
      numeroTarjeta: this.form.get('numeroTarjeta')?.value,
      fechaExpiracion: this.form.get('fechaExpiracion')?.value,
      cvv: this.form.get('cvv')?.value,
    }

    this.tarjetaService.guardarTarjeta(tarjeta)
    .subscribe(d => {
      this.toast.success('Registro agregado', 'La tarjeta fue agregada');
      this.tarjetaService.obtenerTarjetas();
      this.form.reset();
    });
  }

  public editar() {
    const tarjeta: TarjetaCredito = {
      id: this.tarjeta?.id,
      nombreTitular: this.form.get('titular')?.value,
      numeroTarjeta: this.form.get('numeroTarjeta')?.value,
      fechaExpiracion: this.form.get('fechaExpiracion')?.value,
      cvv: this.form.get('cvv')?.value,
    }

    this.tarjetaService.actualizarTarjeta(this.idTarjeta, tarjeta).subscribe(data => {
      this.toast.info('Registro editado', 'La tarjeta fue editada');
      this.tarjetaService.obtenerTarjetas();
      this.form.reset();
      this.idTarjeta = 0;
    });
  }


}
