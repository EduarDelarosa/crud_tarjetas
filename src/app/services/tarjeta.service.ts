import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { TarjetaCredito } from '../models/tarjetaCredito';

@Injectable({
  providedIn: 'root'
})
export class TarjetaService {

  url = "https://localhost:44362/";
  apiUrl = 'api/tarjetaCredito/';
  list: TarjetaCredito[] = [];
  private actualizarForm = new BehaviorSubject<TarjetaCredito>({} as any);

  constructor(private http: HttpClient) { }

  guardarTarjeta(tarjeta: TarjetaCredito): Observable<TarjetaCredito> {
    return this.http.post<TarjetaCredito>(this.url + this.apiUrl, tarjeta);
  }

  obtenerTarjetas() {
    this.http.get(this.url + this.apiUrl).toPromise()
                  .then( data => {
                  this.list = data as TarjetaCredito[];
    })
  }

  eliminarTarjeta(id: number): Observable<TarjetaCredito> {
    return this.http.delete<TarjetaCredito>(this.url + this.apiUrl + id);
  }

  actualizar(tarjeta: TarjetaCredito) {
    this.actualizarForm.next(tarjeta);
  }

  obtenerTarjeta$(): Observable<TarjetaCredito> {
    return this.actualizarForm.asObservable();
  }

  actualizarTarjeta(id: any, tarjeta: TarjetaCredito): Observable<TarjetaCredito> {
    return this.http.put<TarjetaCredito>(this.url + this.apiUrl + id, tarjeta);
  }
}
