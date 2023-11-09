import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  public Student = new BehaviorSubject(null);
  public updatestudentcontent = new BehaviorSubject(null);
  constructor(private _HttpClient:HttpClient) { }

   GetStudent():Observable<any>{
   return this._HttpClient.get(`${environment.Server_URL}/listStudent`);
  }

   CreateStudent(data : object):Observable<any>{
   return this._HttpClient.post(`${environment.Server_URL}/addStudent`, data);
  }

   UpdateStudent(data : object, id:number):Observable<any>{
   return this._HttpClient.put(`${environment.Server_URL}/updateStudent/${id}?`, data);
  }
  GetStudentContent(id:number):Observable<any>{
    return this._HttpClient.get(`${environment.Server_URL}/listStudentSubjectContents/${id}`);
  }

   DeleteStudent(id:number):Observable<any>{
   return this._HttpClient.delete(`${environment.Server_URL}/deleteStudent/${id}`);
  }

  // these are for the subject content acttivation or mobile activated
  removethemobile(data:object):Observable<any>{
    return this._HttpClient.post(`${environment.Server_URL}/restoreMobile`, data);
  }
  deletestudentsubjectcontent(id:number){
    return this._HttpClient.delete(`${environment.Server_URL}/StudentSubjectContents/delete/${id}`);
  }
}
