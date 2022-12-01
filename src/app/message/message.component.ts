import { Component, OnInit, Input } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Message } from '../services/data.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent implements OnInit {
  @Input() message: Message;

  constructor(private alertController: AlertController) { }

  ngOnInit() {}

  isIos() {
    const win = window as any;
    return win && win.Ionic && win.Ionic.mode === 'ios';
  }

  edit(){

  }

  async deleteNote(){
    const alert = await this.alertController.create({
      header: 'Realmente deseas eliminar el mensaje?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            //TODO: Do nothing
          },
        },
        {
          text: 'Eliminar',
          role: 'confirm',
          handler: () => {
            //TODO: Delete Message
          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
  }
}
