import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
})
export class FeedPage implements OnInit {

  private dados: any;

  constructor(private fbService: FirebaseService) { }

  ngOnInit() {
  }

  cadastrarDados(){
    this.fbService.addDados(this.dados);
  }



}
