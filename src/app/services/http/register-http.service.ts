import { Injectable } from '@angular/core';
import { HttpClientService } from './http-client-service';
import { environment } from 'src/environments/environment';
import { RegisterUserRequestDto } from 'src/app/models/register/register-user-dto';

@Injectable({
  providedIn: 'root'
})
export class RegisterHttpService {

  constructor(private httpService: HttpClientService) { }

  public registerUser(dto: RegisterUserRequestDto): Promise<void> {
    return new Promise((resolve, reject) => {
      const url = environment.apiUrl + 'register';
      this.httpService.post(url, dto).subscribe(() => {
        resolve();
      }, (error) => {
        reject(error);
      })
    });
  }
}
