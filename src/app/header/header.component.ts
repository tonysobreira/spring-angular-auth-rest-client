import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  //authService: any;
  constructor(private router: Router, private authservice : AuthService) { }
  userEmail: string;

  ngOnInit() {
    this.isloginn();

    this.authservice.user().subscribe(res => {
      var email = res.email;
      this.userEmail = email;
      console.log(email);
      console.log(res);
    }, (err) => {
      console.log(err);
    });
  }

  isloginn(){
    
    /*
    this.authservice.user().subscribe(res => {
      var email = res.email;
      this.userEmail = email;
      console.log(email);
      console.log(res);
    }, (err) => {
      console.log(err);
    });
    */

    if (localStorage.getItem('token')){
      return true;
    }

    
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }

}
