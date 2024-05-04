import { Component, OnInit, ɵbypassSanitizationTrustResourceUrl } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/modules/material.module';

@Component({
  selector: 'app-auth-footer',
  templateUrl: './auth-footer.component.html',
  styleUrls: ['./auth-footer.component.scss'],
  standalone: true,
  imports: [MaterialModule, RouterModule]
})
export class AuthFooterComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
