import { Injectable } from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http';
import{ Customers} from './customers.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  baseUrl:string = "http://127.0.0.1:5000/"

  constructor( private httpClient : HttpClient) { }

  public addCust(name:any, ic:any, phone:any, email:any){
    return this.httpClient.post<any>(this.baseUrl+'customers',{name, ic, phone, email}).
    pipe(map ((Customers:any) => {
      return Customers;
    }));
  }

  public listCust(){
    return this.httpClient.get<Customers[]>(this.baseUrl+'customers');
  }

  public deleteCust(id:any){
    return this.httpClient.delete(this.baseUrl+'customers/'+id)
  }

  getCust(id:any){
    return this.httpClient.get<Customers>(this.baseUrl+'customers/'+id);
  }

  updateCust(customers:any){
    return this.httpClient.put<Customers>(this.baseUrl+'customers/'+customers.id,customers);
  }
}
