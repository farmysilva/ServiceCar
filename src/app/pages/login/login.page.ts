import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { async } from '@angular/core/testing';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  private username: string;
  private password: string;

  constructor(private aFAuth: AngularFireAuth, private router: Router ) { }

  ngOnInit() {
  }

  async login(){
    const {username, password} = this;
    try {
      const response = await this.aFAuth.signInWithEmailAndPassword(username + '@gnikcah.com', password);
    } catch (error) {      
      console.dir(error);
      if(error.code === 'auth/user-not-found'){
        console.log('Usuário não encontrado');
        this.router.navigate(['/register']);
      }
    }
  }

  register(){
    this.router.navigate(['/register']);
  }

}

