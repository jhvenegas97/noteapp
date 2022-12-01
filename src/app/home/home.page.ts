import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { Message } from '../interface/Message';
import { Observable } from 'rxjs';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {
  private messages: Message[];

  constructor(private data: DataService, private router: Router) {}

  ngOnInit(): void {
    this.getMessages(); 
  }

  refresh(ev) {
    setTimeout(() => {
      ev.detail.complete();
    }, 3000);
  }

  async getMessages(){
    this.data.getMessages().subscribe(res=>{
      this.messages = JSON.parse(res);
    });
  }

  createMessage(){
    this.router.navigate(['/create-edit-message']);
  }

}
