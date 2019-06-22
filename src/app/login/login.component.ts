import { Component, OnInit } from '@angular/core';
import { Hub, Auth } from 'aws-amplify';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor() { }

  state = { user: null };

  ngOnInit() {
    Hub.listen("auth", ({ payload: { event, data } }) => {
      switch (event) {
        case "signIn":
          this.state={ user: data };
          break;
        case "signOut":
          this.state={ user: null };
          break;
      }
    });

    Auth.currentAuthenticatedUser()
      .then(user => this.state={ user })
      .catch(() => console.log("Not signed in"));
  }

}
