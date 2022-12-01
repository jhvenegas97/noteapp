import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Message } from '../interface/Message';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent implements OnInit {
  @Input() message: Message;

  constructor(private alertController: AlertController, private dataService: DataService,private router: Router) { }

  ngOnInit() {}

  isIos() {
    const win = window as any;
    return win && win.Ionic && win.Ionic.mode === 'ios';
  }

  edit(guid){
    this.router.navigate(['/create-edit-message',guid]);
  }

  async deleteMessage(guid){
    const alert = await this.alertController.create({
      header: 'Realmente deseas eliminar el mensaje?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
          },
        },
        {
          text: 'Eliminar',
          role: 'confirm',
          handler: () => {
            this.dataService.getMessages().subscribe(res=>{
              let dataMessages = JSON.parse(res);
              let messageToDelete;
              dataMessages.forEach(element => {
                if(element.id == guid){
                  messageToDelete = element;
                }
              });

              if(messageToDelete != undefined){
                dataMessages.splice(dataMessages.indexOf(messageToDelete),1);
                this.dataService.addUpdateMessage(dataMessages).subscribe(res=>{
                  this.router.navigate(['/']).then(()=>{
                    window.location.reload();
                  });
                });
              }
            });
          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
  }
}
