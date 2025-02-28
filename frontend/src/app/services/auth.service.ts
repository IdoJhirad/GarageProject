import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiURL = 'http://localhost:3000/api/v1'
  constructor(private http: HttpClient,private router: Router) { }

  login(email: string, password:string): Observable<any> {
    const body = {email, password};
    return this.http.post(`${this.apiURL}/auth/login`,body,{ withCredentials: true });
  }

  register(name: string, email: string, password: string): Observable<any> {
    const body = { name, email, password };
    return this.http.post(`${this.apiURL}/auth/register`, body);
  }
  checkAuth():Observable<boolean> {
    return this.http.get<boolean>(`${this.apiURL}/auth/check-auth`,
      { withCredentials: true, 
        observe: 'response' }).pipe(
      map((response) => response.status === 200 ),
      catchError(()=>of(false)) );
  }
  logOut():void{
     this.http.post(`${this.apiURL}/auth/logout`,{withCredentials:true})
    localStorage.removeItem('userName');
    this.router.navigate(['/login']);
  }
}
