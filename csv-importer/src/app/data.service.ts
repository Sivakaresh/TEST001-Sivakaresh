import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Data } from '@angular/router';


const httpOption = {
  headers: new HttpHeaders({'Content-Type':'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class DataService {

  
  constructor(private http:HttpClient) { }
  private dataUrl="http://localhost:8000/api/student"
  createData(data){
    return this.http.post<Data>(this.dataUrl,data);
  }
  
}
