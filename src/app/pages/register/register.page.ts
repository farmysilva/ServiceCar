import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  private username: string;
  private password: string;
  private cpassword: string;

  constructor(
    private aFAuth: AngularFireAuth,
    public router: Router,
    private alert: AlertController
  ) { }

  ngOnInit() {
  }

  async signUp(){
    const {username, password, cpassword} = this;
    if(password != cpassword){
      //trocar cores via diretivas e css, beep...
      this.showAlert('Error!', 'Password não confere!');
      return console.error('password não confere!');
    }else{
      try {
        const response = await this.aFAuth.createUserWithEmailAndPassword(
          username + '@gnikcah.com', password
        );
        console.log(response);
        this.showAlert('Sucesso!', 'Bem vindo ao Service Car!');
        this.router.navigate(['/tabs']);
      } catch (error) {
        console.dir(error);
        this.showAlert('Error!', error.message);
        if(error.code === "auth/user-not-found"){
          console.log('Usuário não encontrado');
        }/*
        if(error.code === "auth/user-not-found"){
          console.log('Usuário não encontrado');
        }  */
      }
    }
  }

  async showAlert(header: string, message: string){
    const alert = await this.alert.create({
      header,
      message,
      buttons: ['Ok']
    });
    await alert.present();
  }

}

