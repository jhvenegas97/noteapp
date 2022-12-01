import { Component, OnInit } from '@angular/core';
import { Guid } from '../interface/Guid';
import { DataService } from '../services/data.service';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Message } from '../interface/Message';

@Component({
  selector: 'app-create-edit-message',
  templateUrl: './create-edit-message.page.html',
  styleUrls: ['./create-edit-message.page.scss'],
})
export class CreateEditMessagePage implements OnInit {

  private textMessage: string;
  private messageEdit: Message;
  private textEdit = "Guardar";

  constructor(private dataService: DataService, private activatedRoute: ActivatedRoute,private router: Router) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id != undefined) {
      this.textEdit = "Actualizar";
      //TODO: Traer datos del mensaje y colocarlos para mostrar en la vista
    }
  }

  createUpdateMessage() {
    if (this.textEdit == "Guardar") {
      let message = {
        text: this.textMessage,
        date: new Date(),
        id: Guid.newGuid()
      }

      let messages = [];

      this.dataService.getMessages().subscribe(res => {
        messages = res== null?[]:JSON.parse(res);
        messages.push(message);
        this.dataService.addUpdateMessage(messages).subscribe(res=>{
          this.router.navigate(['/']).then(()=>{
            window.location.reload();
          });
        });
      })

    }
    else {
      let message = {
        text: this.textMessage,
        date: new Date(),
        id: this.messageEdit.id
      }

      this.dataService.getMessages().subscribe(res => {
        let dataMessages = JSON.parse(res);
        let messageToDelete;
        dataMessages.forEach(element => {
          if (element.id == this.messageEdit.id) {
            messageToDelete = element;
          }
        });

        if (messageToDelete != undefined) {
          dataMessages.splice(dataMessages.indexOf(messageToDelete), 1);
          dataMessages.push(message)
          this.dataService.addUpdateMessage(dataMessages).subscribe(res=>{
            this.router.navigate(['/']).then(()=>{
              window.location.reload();
            });
          });
        }
      })
    }
  }

}
