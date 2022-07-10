import { Component, Inject, OnInit } from '@angular/core';
import { OKTA_AUTH } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';

@Component({
  selector: 'app-login-status',
  templateUrl: './login-status.component.html',
  styleUrls: ['./login-status.component.css']
})
export class LoginStatusComponent implements OnInit {

  isAuthenticated: boolean = false;
  userFullName: string = "";
  //userFullName2: string = "";

  constructor(@Inject(OKTA_AUTH) private oktaAuth: OktaAuth) {
    this.oktaAuth.authStateManager.subscribe(
      (isAuth: any) => this.isAuthenticated = isAuth
    );
  }

  async ngOnInit() {
    this.isAuthenticated = await this.oktaAuth.isAuthenticated();

    if (this.isAuthenticated) {
      const userClaim = await this.oktaAuth.getUser();
      /*const userClaim2 = await this.oktaAuth.getUser().then(
        res => {
          this.userFullName2 = res.name!;
        }
      );*/
      this.userFullName = userClaim.name!;
    }
    console.log("Autentication = " + this.isAuthenticated);
    console.log("Username = " + this.userFullName);
    //console.log("Username2 = " + this.userFullName2);
  }

  async logout() {
    // terminates the session
    await this.oktaAuth.signOut();
  }

}
