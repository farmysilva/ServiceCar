import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { first } from 'rxjs/operators';
import { auth } from 'firebase/app';

interface User {
    username: string;
    uid: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user: User;

  constructor(
    private aFAuth: AngularFireAuth    
  ) { }

  setUser(user: User){
    this.user = user;
  }

  getUsername(): string {
    return this.user.username;
  }

  updateEmail(newEmail: string){
    //auth() é uma função da interface do firebase que implementa
    //mecanismos de update do usuário logado.
    return auth().currentUser.updateEmail(newEmail + '@gnikcah.com');
  }

  updatePassword(newPassword: string){
    return auth().currentUser.updatePassword(newPassword);
  }

  async isAuthenticated(){
    if (this.user) {
      return true;
    }

    const user = await this.aFAuth.authState.pipe(first()).toPromise();

    if(user){
      this.setUser(
        {
          username : user.email.split('@')[0],
          uid: user.uid
        }
      );
      
      return true;
    }
    return false;
  }

  getUID(){
    return this.user.uid;
  }

  reAuth(username: string, password: string){
    return auth().currentUser.reauthenticateWithCredential(auth.EmailAuthProvider.credential(username + '@gnikcah.com', password));
  }

}
