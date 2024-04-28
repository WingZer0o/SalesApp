import { Injectable } from '@angular/core';
import { HttpClientService } from './http-client-service';
import { environment } from 'src/environments/environment';
import { LoginDto } from 'src/app/models/login/login-dto';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginHttpService  {

  constructor(private httpClientService: HttpClientService) {
    
  }

  public login(body: LoginDto) {
    const url: string = environment.apiUrl + 'login';
    return this.httpClientService.post(url, body).subscribe((response) => {
      console.log(response);
    }, (error: HttpErrorResponse) => {
      console.log(error);
    });
  }
}
