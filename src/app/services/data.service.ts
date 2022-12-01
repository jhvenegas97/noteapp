import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { BehaviorSubject, from } from 'rxjs';
import { switchMap, filter } from 'rxjs/operators';
import { Message } from '../interface/Message';

const STORAGE_KEY = 'messages';

@Injectable({
  providedIn: 'root'
})
export class DataService{
  private storageReady = new BehaviorSubject(false);

  constructor(private storage: Storage) { 
    this.init();
   }

  async init(){
    await this.storage.create();
    this.storageReady.next(true);
  }

  public getMessages(){
    return this.storageReady.pipe(
      filter(ready=>ready),
      switchMap(_ => {
        return from(this.storage.get(STORAGE_KEY) || [])
      })
    )
  }

  public addUpdateMessage(item){
    return this.storageReady.pipe(
      switchMap(_ =>{
        return from(this.storage.set(STORAGE_KEY,JSON.stringify(item)));
      })
    )
  }

}
