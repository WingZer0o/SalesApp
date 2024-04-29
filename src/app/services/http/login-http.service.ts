import { Injectable } from '@angular/core';
import { HttpClientService } from './http-client-service';
import { environment } from 'src/environments/environment';
import { LoginDto } from 'src/app/models/login/login-dto';
import { HttpErrorResponse } from '@angular/common/http';
import { LoginResponseDto } from 'src/app/models/login/login-response-dto';

@Injectable({
  providedIn: 'root'
})
export class LoginHttpService  {

  constructor(private httpClientService: HttpClientService) {
    
  }

  public login(body: LoginDto): Promise<LoginResponseDto> {
    return new Promise((resolve, reject) => {
      const url: string = environment.apiUrl + 'login';
      this.httpClientService.post(url, body).subscribe((response: LoginResponseDto) => {
        resolve(response);
      }, (error: HttpErrorResponse) => {
        reject(error);
      });
    })
  }
}
