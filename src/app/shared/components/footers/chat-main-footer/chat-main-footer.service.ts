import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatMainFooterService {
  public chatMainFooterInputSubmitSubject = new Subject<string>();
  constructor() { }
}
